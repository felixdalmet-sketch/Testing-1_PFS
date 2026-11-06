import Link from "next/link";
import Image from "next/image";

const REGISTER_URL = "https://forms.gle/szVdWVhLMAos6Bqy7";
const HEADER_IMG = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80";
const DETAIL_IMG = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80";

export default function VenuePage() {
  return (
    <div className="min-h-screen paper-bg">
      <header className="sticky top-0 z-50 border-b border-[#e5e2d9]/90 bg-[#f7f4ef]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-sm tracking-[0.22em] uppercase">PAPER FASHION</Link>
          <div className="flex items-center gap-6 font-sans-ui text-xs tracking-widest uppercase">
            <Link href="/about" className="hidden md:inline hover:text-[#c9a227]">About</Link>
            <Link href="/agenda" className="hidden md:inline hover:text-[#c9a227]">Agenda</Link>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-5 text-xs">Register</a>
          </div>
        </div>
      </header>

      <div className="relative h-48 md:h-64">
        <Image src={HEADER_IMG} alt="Campus and classroom setting" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-[#1a1a1a]/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-2">Location</p>
          <h1 className="font-display text-3xl md:text-5xl text-white">Venue & Location</h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-14 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-14 items-start">
          <div>
            <h2 className="font-display text-2xl mb-4">Classroom 3, PG Building</h2>
            <p className="text-[#555] leading-relaxed mb-6">
              KLE CBALC, Belagavi. A classroom configured as a compact runway space — safe,
              easy to set up and restore, suited to a one-day college showcase.
            </p>
            <div className="space-y-4 font-sans-ui text-sm">
              {[
                ["Venue", "Classroom 3, PG Building"],
                ["Institution", "KLE CBALC, Belagavi"],
                ["Date", "Saturday, 7 November 2026"],
                ["Time", "9:00 AM – 1:30 PM"],
                ["Reporting", "Teams by 8:30 AM"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[#e5e2d9] pb-3">
                  <span className="text-[#999] tracking-widest uppercase text-xs">{k}</span>
                  <span className="font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-[#e5e2d9]">
            <Image src={DETAIL_IMG} alt="Bright indoor event space" fill className="object-cover" sizes="50vw" />
          </div>
        </div>

        <div className="bg-white border border-[#e5e2d9] p-6 md:p-8 mb-10 shadow-sm">
          <h3 className="font-sans-ui text-xs tracking-widest uppercase text-[#999] mb-5">
            Event zones inside Classroom 3
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#555]">
            <li><strong className="text-[#1a1a1a]">Runway lane</strong> — clear path, floor-safe tape</li>
            <li><strong className="text-[#1a1a1a]">Waiting / lineup</strong> — one team at a time</li>
            <li><strong className="text-[#1a1a1a]">Judges' table</strong> — full runway view</li>
            <li><strong className="text-[#1a1a1a]">Host / sound</strong> — safe volume announcements</li>
            <li><strong className="text-[#1a1a1a]">Prep corner</strong> — final outfit checks</li>
            <li><strong className="text-[#1a1a1a]">Audience seating</strong> — clear aisles & exits</li>
          </ul>
        </div>

        <div className="bg-[#1a1a1a] text-[#faf9f6] p-8 md:p-10 mb-12">
          <h2 className="font-display text-xl mb-3 text-[#c9a227]">Important for participants</h2>
          <ul className="space-y-2 text-sm text-[#ccc] font-sans-ui">
            <li>• Teams must report by <strong className="text-white">8:30 AM</strong> for check-in and outfit readiness.</li>
            <li>• Clear access to entrance and exit will be maintained at all times.</li>
            <li>• Furniture movement and décor only with faculty/venue permission.</li>
            <li>• The event will not proceed with an obstructed exit or unsafe crowding.</li>
          </ul>
        </div>

        <div className="text-center">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Register Your Team</a>
        </div>
      </main>

      <footer className="border-t border-[#e5e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 font-sans-ui text-xs text-[#999]">
          <p>© 2026 KLE CBALC, Belagavi. PAPER FASHION WALK.</p>
          <Link href="/" className="hover:text-[#1a1a1a]">Home</Link>
        </div>
      </footer>
    </div>
  );
}
