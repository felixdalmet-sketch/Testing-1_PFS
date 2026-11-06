import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

const REGISTER_URL = "https://forms.gle/szVdWVhLMAos6Bqy7";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
  paperCraft: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80",
  fabricTexture: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=80",
  runwayMood: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1200&q=80",
  recyclePaper: "https://images.unsplash.com/photo-1532996122723-e8e8423035c2?auto=format&fit=crop&w=1000&q=80",
};

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
  const time =
    event?.startTime && event?.endTime
      ? `${event.startTime} – ${event.endTime}`
      : "9:00 AM – 1:30 PM";

  return (
    <div className="min-h-screen paper-bg">
      <header className="sticky top-0 z-50 border-b border-[#e5e2d9]/90 bg-[#f7f4ef]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-sm tracking-[0.22em] uppercase">
            PAPER FASHION
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-sans-ui text-xs tracking-widest uppercase">
            <Link href="/about" className="hover:text-[#c9a227] transition-colors">About</Link>
            <Link href="/agenda" className="hover:text-[#c9a227] transition-colors">Agenda</Link>
            <Link href="/venue" className="hover:text-[#c9a227] transition-colors">Venue</Link>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-5 text-xs">
              Register
            </a>
          </nav>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="md:hidden btn-primary !py-2 !px-4 text-xs">
            Register
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[70vh] lg:min-h-[78vh]">
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-20 order-2 lg:order-1">
            <p className="font-sans-ui text-xs tracking-[0.35em] uppercase text-[#c9a227] mb-5">
              KLE CBALC · Belagavi
            </p>
            <h1 className="heading-xl mb-5">
              Paper
              <span className="block text-[#c9a227]">Fashion Walk</span>
              <span className="block text-2xl md:text-3xl mt-3 tracking-[0.15em] text-[#666]">2026</span>
            </h1>
            <p className="text-lg md:text-xl text-[#555] font-display italic mb-8 max-w-md">
              {tagline}
            </p>
            <div className="accent-line w-20 mb-8" />
            <p className="font-sans-ui text-sm text-[#666] max-w-md leading-relaxed mb-10">
              A creative runway experience celebrating imagination, design thinking and
              responsible use of materials. Turn ordinary paper into extraordinary style.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Register Your Team
              </a>
              <Link href="/about" className="btn-outline">Discover More</Link>
            </div>
          </div>

          <div className="relative min-h-[42vh] lg:min-h-full order-1 lg:order-2">
            <Image
              src={IMAGES.hero}
              alt="Layered paper and craft textures"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#f7f4ef]/40 lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-8 lg:bottom-8 lg:w-56">
              <div className="bg-[#f7f4ef]/95 backdrop-blur border border-[#e5e2d9] px-5 py-4 shadow-sm">
                <p className="font-sans-ui text-[10px] tracking-[0.2em] uppercase text-[#999] mb-1">Theme</p>
                <p className="font-display text-sm leading-snug">Reimagine · Recycle · Ramp Walk</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-[#e5e2d9] bg-white/70">
          <div className="max-w-6xl mx-auto px-6 py-7 grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans-ui text-sm">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#999] mb-1">Date</p>
              <p className="font-medium">{dateStr}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#999] mb-1">Time</p>
              <p className="font-medium">{time}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#999] mb-1">Venue</p>
              <p className="font-medium">{venue}</p>
              <p className="text-[#666] text-xs mt-0.5">{address}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-4">The Concept</p>
            <h2 className="heading-lg mb-6">
              Paper as the medium.
              <br />
              Creativity as the statement.
            </h2>
            <div className="accent-line w-16 mb-8" />
            <p className="text-[#555] leading-relaxed mb-5">
              Student teams conceptualise, construct and present fashion looks made primarily
              from paper — newspaper, kraft, chart paper, packaging and clean reused materials.
            </p>
            <p className="text-[#555] leading-relaxed mb-8">
              Each team introduces its concept, walks the runway and explains materials and
              construction. Judged on creativity, use of paper, craftsmanship, presentation and impact.
            </p>
            <div className="grid grid-cols-2 gap-4 font-sans-ui text-sm">
              {[
                { label: "Teams", value: "8" },
                { label: "Team size", value: "2–5" },
                { label: "Walk time", value: "3 min" },
                { label: "Entry", value: "Free" },
              ].map((item) => (
                <div key={item.label} className="border border-[#e5e2d9] bg-white/60 px-4 py-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#999]">{item.label}</p>
                  <p className="font-display text-xl mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={IMAGES.paperCraft} alt="Paper craft and design materials" fill className="object-cover" sizes="40vw" />
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={IMAGES.recyclePaper} alt="Recycled paper materials" fill className="object-cover" sizes="30vw" />
              </div>
              <div className="relative flex-1 min-h-[140px] overflow-hidden">
                <Image src={IMAGES.fabricTexture} alt="Handmade texture detail" fill className="object-cover" sizes="30vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[42vh] md:h-[48vh]">
        <Image src={IMAGES.runwayMood} alt="Fashion presentation atmosphere" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#1a1a1a]/55" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-sans-ui text-xs tracking-[0.35em] uppercase text-[#c9a227] mb-4">One day · One runway</p>
            <h2 className="font-display text-3xl md:text-5xl text-white max-w-2xl leading-tight">
              From scrap paper to stage presence
            </h2>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5e2d9] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="heading-lg text-[#faf9f6] mb-4">Ready to walk the runway?</h2>
          <p className="text-[#aaa] mb-10 max-w-md mx-auto font-sans-ui text-sm">
            Gather your team of 2–5, design a paper fashion look, and register before the slots fill.
          </p>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-[#c9a227] !text-[#1a1a1a] hover:!bg-[#faf9f6]">
            Register Now
          </a>
        </div>
      </section>

      <footer className="border-t border-[#e5e2d9] bg-[#f7f4ef]">
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
