import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { qrToken: token },
    include: {
      registration: {
        include: {
          event: true,
          ticketType: true,
        },
      },
      checkIns: {
        orderBy: { checkedInAt: "desc" },
        take: 1,
        include: { staff: { select: { name: true, email: true } } },
      },
    },
  });

  if (!ticket) {
    return NextResponse.json({
      valid: false,
      status: "INVALID",
      message: "Ticket not found",
    });
  }

  const alreadyCheckedIn = ticket.checkIns.length > 0;

  return NextResponse.json({
    valid: ticket.status === "VALID",
    status: ticket.status,
    alreadyCheckedIn,
    ticket: {
      ticketNumber: ticket.ticketNumber,
      status: ticket.status,
      issuedAt: ticket.issuedAt,
    },
    registration: {
      registrationId: ticket.registration.registrationId,
      fullName: ticket.registration.fullName,
      email: ticket.registration.email,
      teamName: ticket.registration.teamName,
      designTitle: ticket.registration.designTitle,
      status: ticket.registration.status,
    },
    event: {
      name: ticket.registration.event.name,
      venueName: ticket.registration.event.venueName,
    },
    lastCheckIn: alreadyCheckedIn
      ? {
          at: ticket.checkIns[0].checkedInAt,
          by: ticket.checkIns[0].staff?.name || "Staff",
        }
      : null,
  });
}

export async function POST(req: NextRequest) {
  // Check-in endpoint (requires auth)
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role;
  const allowed = ["SUPER_ADMIN", "EVENT_MANAGER", "REGISTRATION_MANAGER", "CHECKIN_STAFF"];
  if (!allowed.includes(role)) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const body = await req.json();
  const { token, force } = body;

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { qrToken: token },
    include: {
      registration: true,
      checkIns: true,
    },
  });

  if (!ticket) {
    return NextResponse.json({ valid: false, status: "INVALID", message: "Ticket not found" });
  }

  if (ticket.status === "CANCELLED" || ticket.status === "EXPIRED") {
    return NextResponse.json({
      valid: false,
      status: ticket.status,
      message: `Ticket is ${ticket.status.toLowerCase()}`,
    });
  }

  if (ticket.checkIns.length > 0 && !force) {
    return NextResponse.json({
      valid: true,
      status: "ALREADY_USED",
      message: "Already checked in",
      checkedInAt: ticket.checkIns[0].checkedInAt,
    });
  }

  const checkIn = await prisma.checkIn.create({
    data: {
      ticketId: ticket.id,
      checkedInBy: (session.user as any).id,
    },
  });

  // Optionally mark ticket as USED
  await prisma.ticket.update({
    where: { id: ticket.id },
    data: { status: "USED" },
  });

  await prisma.ticketVerification.create({
    data: {
      ticketId: ticket.id,
      result: "VALID",
      verifiedBy: (session.user as any).id,
    },
  });

  return NextResponse.json({
    success: true,
    status: "CHECKED_IN",
    message: "Successfully checked in",
    checkIn: {
      id: checkIn.id,
      at: checkIn.checkedInAt,
    },
    participant: {
      name: ticket.registration.fullName,
      teamName: ticket.registration.teamName,
      registrationId: ticket.registration.registrationId,
    },
  });
}
