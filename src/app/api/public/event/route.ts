import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      include: {
        ticketTypes: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
        formFields: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
        pages: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
      },
    });

    if (!event) {
      return NextResponse.json({ event: null });
    }

    return NextResponse.json({
      event: {
        id: event.id,
        name: event.name,
        tagline: event.tagline,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        venueName: event.venueName,
        venueAddress: event.venueAddress,
        registrationMode: event.registrationMode,
        primaryColor: event.primaryColor,
        secondaryColor: event.secondaryColor,
      },
      ticketTypes: event.ticketTypes,
      formFields: event.formFields,
      pages: event.pages,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
