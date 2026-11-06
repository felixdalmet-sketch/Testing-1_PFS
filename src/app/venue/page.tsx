import Link from "next/link";

export default function VenuePage() {
  return (
    <div className="min-h-screen paper-bg">
      <header className="border-b border-[#e5e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase">
            PAPER FASHION WALK
          </Link>
          <div className="flex items-center gap-6 font-sans-ui text-xs tracking-widest uppercase">
            <Link href="/about" className="hidden md:inline hover:text-[#c9a227]">About</Link>
            <Link href="/agenda" className="hidden md:inline hover:text-[#c9a227]">Agenda</Link>
            <a
              href="https://forms.gle/szVdWVhLMAos6Bqy7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2 !px-5 text-xs"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-3">
          Location
        </p>
        <h1 className="heading-lg mb-2">Venue & Location</h1>
        <div className="accent-line w-16 mb-12" />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-display text-xl mb-4">Classroom 3, PG Building</h2>
            <p className="text-[#555] leading-relaxed mb-6">
              KLE CBALC, Belagavi. The event is hosted in a classroom configured as a compact
              runway space — safe, easy to set up and restore, and suited to a one-day college showcase.
            </p>
            <div className="space-y-4 font-sans-ui text-sm">
              <div className="flex justify-between border-b border-[#e5e2d9] pb-3">
                <span className="text-[#999] tracking-widest uppercase text-xs">Venue</span>
                <span className="font-medium text-right">Classroom 3, PG Building</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e2d9] pb-3">
                <span className="text-[#999] tracking-widest uppercase text-xs">Institution</span>
                <span className="font-medium text-right">KLE CBALC, Belagavi</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e2d9] pb-3">
                <span className="text-[#999] tracking-widest uppercase text-xs">Date</span>
                <span className="font-medium text-right">Saturday, 7 November 2026</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e2d9] pb-3">
                <span className="text-[#999] tracking-widest uppercase text-xs">Time</span>
                <span className="font-medium text-right">9:00 AM – 1:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e2d9] pb-3">
                <span className="text-[#999] tracking-widest uppercase text-xs">Reporting</span>
                <span className="font-medium text-right">Teams by 8:30 AM</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-[#e5e2d9] p-6">
              <h3 className="font-sans-ui text-xs tracking-widest uppercase text-[#999] mb-4">
                Event zones inside Classroom 3
              </h3>
              <ul className="space-y-3 text-sm text-[#555]">
                <li><strong className="text-[#1a1a1a]">Runway lane</strong> — clear walking path marked with floor-safe tape</li>
                <li><strong className="text-[#1a1a1a]">Waiting / lineup zone</strong> — one team at a time</li>
                <li><strong className="text-[#1a1a1a]">Judges' table</strong> — full view of runway and outfits</li>
                <li><strong className="text-[#1a1a1a]">Host / sound point</strong> — announcements and music at safe volume</li>
                <li><strong className="text-[#1a1a1a]">Participant preparation</strong> — final outfit checks and repairs</li>
                <li><strong className="text-[#1a1a1a]">Audience seating</strong> — aisles and exits kept clear</li>
                <li><strong className="text-[#1a1a1a]">Photography point</strong> — does not obstruct the runway</li>
              </ul>
            </div>
          </div>
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
          <a
            href="https://forms.gle/szVdWVhLMAos6Bqy7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Register Your Team
          </a>
        </div>
      </main>

      <footer className="border-t border-[#e5e2d9] mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 font-sans-ui text-xs text-[#999]">
          <p>© 2026 KLE CBALC, Belagavi. PAPER FASHION WALK.</p>
          <Link href="/" className="hover:text-[#1a1a1a]">Home</Link>
        </div>
      </footer>
    </div>
  );
}
