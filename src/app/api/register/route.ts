import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import {
  generateRegistrationId,
  generateTicketNumber,
  generateSecureToken,
} from "@/lib/utils";
import { generateQRDataUrl } from "@/lib/qr";
import { sendEmail, registrationConfirmationHtml } from "@/lib/email";

const registrationSchema = z.object({
  eventId: z.string().min(1),
  ticketTypeId: z.string().optional(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  teamName: z.string().optional(),
  teamSize: z.number().min(2).max(5).optional(),
  designTitle: z.string().optional(),
  conceptNote: z.string().optional(),
  materialsNote: z.string().optional(),
  modelNames: z.string().optional(),
  invitationCode: z.string().optional(),
  rsvpStatus: z.enum(["ATTENDING", "NOT_ATTENDING", "MAYBE"]).optional(),
  customAnswers: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = registrationSchema.parse(body);

    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
      include: { ticketTypes: true },
    });

    if (!event || !event.isPublished) {
      return NextResponse.json({ error: "Event not found or not published" }, { status: 404 });
    }

    // Invitation-only check
    if (event.registrationMode === "INVITATION_ONLY") {
      if (!data.invitationCode) {
        return NextResponse.json({ error: "Invitation code required" }, { status: 400 });
      }
      const invite = await prisma.invitation.findFirst({
        where: {
          eventId: event.id,
          code: data.invitationCode,
          isActive: true,
        },
      });
      if (!invite || (invite.expiresAt && invite.expiresAt < new Date())) {
        return NextResponse.json({ error: "Invalid or expired invitation code" }, { status: 400 });
      }
      if (invite.usedCount >= invite.maxUses) {
        return NextResponse.json({ error: "Invitation code already used" }, { status: 400 });
      }
    }

    // Duplicate check
    const existing = await prisma.registration.findFirst({
      where: {
        eventId: event.id,
        email: data.email.toLowerCase(),
        status: { not: "CANCELLED" },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A registration with this email already exists for this event" },
        { status: 409 }
      );
    }

    // Capacity check for team ticket
    const ticketType = data.ticketTypeId
      ? await prisma.ticketType.findUnique({ where: { id: data.ticketTypeId } })
      : event.ticketTypes[0];

    if (ticketType?.capacity) {
      const count = await prisma.registration.count({
        where: {
          eventId: event.id,
          ticketTypeId: ticketType.id,
          status: { in: ["PENDING", "CONFIRMED"] },
        },
      });
      if (count >= ticketType.capacity) {
        return NextResponse.json({ error: "Registration capacity reached" }, { status: 400 });
      }
    }

    const registrationId = generateRegistrationId();
    const ticketNumber = generateTicketNumber();
    const qrToken = generateSecureToken(40);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create registration + ticket in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const registration = await tx.registration.create({
        data: {
          eventId: event.id,
          ticketTypeId: ticketType?.id,
          registrationId,
          status: "CONFIRMED",
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          organization: data.organization,
          teamName: data.teamName,
          teamSize: data.teamSize,
          designTitle: data.designTitle,
          conceptNote: data.conceptNote,
          materialsNote: data.materialsNote,
          modelNames: data.modelNames,
          invitationCode: data.invitationCode,
          rsvpStatus: data.rsvpStatus,
          customAnswers: data.customAnswers || {},
        },
      });

      let qrCodeDataUrl: string | undefined;
      try {
        qrCodeDataUrl = await generateQRDataUrl(qrToken, baseUrl);
      } catch {
        // continue without QR image if generation fails
      }

      const ticket = await tx.ticket.create({
        data: {
          registrationId: registration.id,
          ticketNumber,
          qrToken,
          qrCodeDataUrl,
          status: "VALID",
        },
      });

      // Increment invitation use
      if (data.invitationCode && event.registrationMode === "INVITATION_ONLY") {
        await tx.invitation.updateMany({
          where: { eventId: event.id, code: data.invitationCode },
          data: { usedCount: { increment: 1 } },
        });
      }

      return { registration, ticket };
    });

    // Find primary SPOC for this ticket type
    let spoc = null;
    if (ticketType) {
      const assignment = await prisma.spocAssignment.findFirst({
        where: { ticketTypeId: ticketType.id, isPrimary: true },
        include: { spoc: true },
      });
      spoc = assignment?.spoc;
    }
    if (!spoc) {
      spoc = await prisma.spoc.findFirst({
        where: { eventId: event.id, isActive: true },
      });
    }

    // Send confirmation email (non-blocking)
    const html = registrationConfirmationHtml({
      participantName: data.fullName,
      eventName: event.name,
      eventDate: new Date(event.startDate).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      venue: `${event.venueName || ""}${event.venueAddress ? ", " + event.venueAddress : ""}`,
      ticketNumber: result.ticket.ticketNumber,
      registrationId: result.registration.registrationId,
      qrCodeDataUrl: result.ticket.qrCodeDataUrl || undefined,
      spocName: spoc?.name,
      spocEmail: spoc?.email,
      spocPhone: spoc?.phone || undefined,
      teamName: data.teamName,
      designTitle: data.designTitle,
    });

    sendEmail({
      to: data.email,
      subject: `Registration Confirmed – ${event.name}`,
      html,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      registration: {
        id: result.registration.id,
        registrationId: result.registration.registrationId,
        status: result.registration.status,
      },
      ticket: {
        ticketNumber: result.ticket.ticketNumber,
        qrToken: result.ticket.qrToken,
        status: result.ticket.status,
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 });
  }
}
