import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

/**
 * One-time browser-accessible setup endpoint.
 * Creates the first Super Admin and seeds the PAPER FASHION WALK event
 * if no users exist yet.
 *
 * POST /api/setup
 * Body: { email, password, name }
 */
export async function POST(req: NextRequest) {
  try {
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      return NextResponse.json(
        { error: "Setup already completed. Users already exist." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Valid email and password (min 8 chars) required" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name || "Super Admin",
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });

    // Seed the default PAPER FASHION WALK event
    const event = await prisma.event.create({
      data: {
        name: "PAPER FASHION WALK 2026",
        tagline: "REIMAGINE • RECYCLE • RAMP WALK",
        description:
          "A creative runway experience celebrating imagination, design thinking and responsible use of materials. Student teams create wearable fashion looks primarily from paper and present them on a classroom runway.",
        category: "College Festival",
        theme: "REIMAGINE • RECYCLE • RAMP WALK",
        startDate: new Date("2026-11-07T00:00:00+05:30"),
        endDate: new Date("2026-11-07T00:00:00+05:30"),
        startTime: "09:00",
        endTime: "13:30",
        timezone: "Asia/Kolkata",
        venueName: "Classroom 3, PG Building",
        venueAddress: "KLE CBALC, Belagavi",
        organizerName: "KLE CBALC",
        organizerEmail: "events@klecbalc.edu.in",
        organizerPhone: "",
        primaryColor: "#1a1a1a",
        secondaryColor: "#c9a227",
        bgColor: "#faf9f6",
        textColor: "#1a1a1a",
        fontFamily: "Georgia, serif",
        registrationMode: "OPEN",
        maxTeams: 8,
        maxTeamSize: 5,
        isPublished: true,
      },
    });

    // Default ticket type for teams
    const ticketType = await prisma.ticketType.create({
      data: {
        eventId: event.id,
        name: "Team Participation",
        description: "Register a team of 2–5 students for the Paper Fashion Walk",
        price: 0,
        currency: "INR",
        capacity: 8,
        category: "team",
        isActive: true,
        sortOrder: 1,
      },
    });

    // Core form fields for the fashion walk
    const fields = [
      { name: "teamName", label: "Team Name", fieldType: "TEXT" as const, isRequired: true, sortOrder: 1 },
      { name: "fullName", label: "Team Leader Full Name", fieldType: "TEXT" as const, isRequired: true, sortOrder: 2 },
      { name: "email", label: "Team Leader Email", fieldType: "EMAIL" as const, isRequired: true, sortOrder: 3 },
      { name: "phone", label: "Team Leader Mobile", fieldType: "PHONE" as const, isRequired: true, sortOrder: 4 },
      { name: "teamSize", label: "Number of Team Members (2–5)", fieldType: "NUMBER" as const, isRequired: true, sortOrder: 5 },
      { name: "designTitle", label: "Design / Outfit Title", fieldType: "TEXT" as const, isRequired: true, sortOrder: 6 },
      { name: "conceptNote", label: "Concept Note (50–100 words)", fieldType: "TEXTAREA" as const, isRequired: true, sortOrder: 7 },
      { name: "materialsNote", label: "Materials Used (paper types & supporting materials)", fieldType: "TEXTAREA" as const, isRequired: true, sortOrder: 8 },
      { name: "modelNames", label: "Model Name(s)", fieldType: "TEXT" as const, isRequired: true, sortOrder: 9 },
    ];

    for (const f of fields) {
      await prisma.formField.create({
        data: {
          eventId: event.id,
          ticketTypeId: ticketType.id,
          ...f,
          isActive: true,
        },
      });
    }

    // Default pages
    const pages = [
      { slug: "home", title: "Home", sortOrder: 0 },
      { slug: "about", title: "About the Event", sortOrder: 1 },
      { slug: "agenda", title: "Event Agenda", sortOrder: 2 },
      { slug: "venue", title: "Venue & Location", sortOrder: 3 },
      { slug: "register", title: "Registration", sortOrder: 4 },
      { slug: "contact", title: "Contact", sortOrder: 5 },
    ];

    for (const p of pages) {
      await prisma.eventPage.create({
        data: {
          eventId: event.id,
          ...p,
          isEnabled: true,
          content: {},
        },
      });
    }

    // Default email template
    await prisma.emailTemplate.create({
      data: {
        eventId: event.id,
        name: "Registration Confirmation",
        subject: "Registration Confirmed – {{event_name}}",
        bodyHtml: "<p>Dear {{participant_name}},</p><p>Your registration is confirmed.</p>",
        isDefault: true,
      },
    });

    // Sample SPOC
    await prisma.spoc.create({
      data: {
        eventId: event.id,
        name: "Event Coordinator",
        designation: "Registration & Participant Support",
        email: "coordinator@klecbalc.edu.in",
        phone: "",
        responsibility: "Team check-in, rules clarification, participant support",
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Setup complete. Super Admin created and PAPER FASHION WALK event seeded.",
      user: { id: user.id, email: user.email, role: user.role },
      eventId: event.id,
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error.message || "Setup failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const eventCount = await prisma.event.count();
    return NextResponse.json({
      setupRequired: userCount === 0,
      userCount,
      eventCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Database not connected", details: error.message },
      { status: 500 }
    );
  }
}
