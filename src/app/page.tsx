import Link from "next/link";
import prisma from "@/lib/prisma";

async function getEvent() {
  try {
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return event;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const event = await getEvent();

  const name = event?.name || "PAPER FASHION WALK 2026";
  const tagline = event?.tagline || "REIMAGINE • RECYCLE • RAMP WALK";
  const venue = event?.venueName || "Classroom 3, PG Building";
  const address = event?.venueAddress || "KLE CBALC, Belagavi";
  const dateStr = event
    ? new Date(event.startDate).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Saturday, 7 November 2026";
  const time = event?.startTime && event?.endTime
    ? `${event.startTime} – ${event.endTime}`
    : "9:00 AM – 1:30 PM";

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b border-[#e5e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase">
            {name.split(" ")[0]} {name.split(" ")[1]}
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-sans-ui text-xs tracking-widest uppercase">
            <Link href="/about" className="hover:text-[#c9a227] transition-colors">About</Link>
            <Link href="/agenda" className="hover:text-[#c9a227] transition-colors">Agenda</Link>
            <Link href="/venue" className="hover:text-[#c9a227] transition-colors">Venue</Link>
            <Link href="/register" className="btn-primary !py-2 !px-5 text-xs">Register</Link>
          </nav>
          <Link href="/register" className="md:hidden btn-primary !py-2 !px-4 text-xs">Register</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-6">
              KLE CBALC • Belagavi
            </p>
            <h1 className="heading-xl mb-6">
              {name.replace(" 2026", "")}
              <span className="block text-[#c9a227] mt-2">2026</span>
            </h1>
            <p className="text-lg md:text-xl text-[#555] font-display italic mb-10 max-w-xl">
              {tagline}
            </p>
            <div className="accent-line w-24 mb-10" />
            <p className="font-sans-ui text-sm text-[#666] max-w-md leading-relaxed mb-12">
              A creative runway experience celebrating imagination, design thinking
              and responsible use of materials. Turn ordinary paper into extraordinary style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary">
                Register Your Team
              </Link>
              <Link href="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Side meta strip */}
        <div className="border-t border-[#e5e2d9] bg-white/50">
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 font-sans-ui text-sm">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#999] mb-1">Date</p>
              <p className="font-medium">{dateStr}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[#999] mb-1">Time</p>
              <p className="font-medium">{time}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[#999] mb-1">Venue</p>
              <p className="font-medium">{venue}</p>
              <p className="text-[#666] text-xs mt-0.5">{address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Concept */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-4">
              The Concept
            </p>
            <h2 className="heading-lg mb-6">Paper as the medium.<br />Creativity as the statement.</h2>
            <div className="accent-line w-16 mb-8" />
            <p className="text-[#555] leading-relaxed mb-6">
              Student teams conceptualise, construct and present fashion looks made
              primarily from paper — newspaper, kraft, chart paper, packaging and clean
              reused materials.
            </p>
            <p className="text-[#555] leading-relaxed">
              Each team introduces its concept, walks the runway and explains the
              materials and construction choices. Judged on creativity, use of paper,
              craftsmanship, presentation and overall impact.
            </p>
          </div>
          <div className="space-y-6 font-sans-ui">
            {[
              { label: "Teams", value: "8 planned" },
              { label: "Team size", value: "2–5 students" },
              { label: "Presentation", value: "Max 3 minutes" },
              { label: "Entry", value: "Free registration" },
              { label: "Judges", value: "3 independent" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between border-b border-[#e5e2d9] pb-3">
                <span className="text-xs tracking-widest uppercase text-[#999]">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#e5e2d9] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="heading-lg text-[#faf9f6] mb-4">Ready to walk the runway?</h2>
          <p className="text-[#aaa] mb-10 max-w-md mx-auto font-sans-ui text-sm">
            Gather your team of 2–5, design a paper fashion look, and register before the slots fill.
          </p>
          <Link href="/register" className="btn-primary !bg-[#c9a227] !text-[#1a1a1a] hover:!bg-[#faf9f6]">
            Register Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4 font-sans-ui text-xs text-[#999]">
          <p>© 2026 KLE CBALC, Belagavi. PAPER FASHION WALK.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-[#1a1a1a]">Contact</Link>
            <Link href="/admin" className="hover:text-[#1a1a1a]">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
