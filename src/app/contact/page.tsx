import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen paper-bg">
      <header className="border-b border-[#e5e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase">
            PAPER FASHION WALK
          </Link>
          <a
            href="https://forms.gle/szVdWVhLMAos6Bqy7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-5 text-xs"
          >
            Register
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16 md:py-20">
        <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-3">
          Contact
        </p>
        <h1 className="heading-lg mb-2">Get in touch</h1>
        <div className="accent-line w-16 mb-10" />

        <div className="space-y-6 font-sans-ui text-sm text-[#555]">
          <div className="border-b border-[#e5e2d9] pb-4">
            <p className="text-xs tracking-widest uppercase text-[#999] mb-1">Organiser</p>
            <p className="font-medium text-[#1a1a1a]">KLE CBALC, Belagavi</p>
          </div>
          <div className="border-b border-[#e5e2d9] pb-4">
            <p className="text-xs tracking-widest uppercase text-[#999] mb-1">Event</p>
            <p className="font-medium text-[#1a1a1a]">PAPER FASHION WALK 2026</p>
          </div>
          <div className="border-b border-[#e5e2d9] pb-4">
            <p className="text-xs tracking-widest uppercase text-[#999] mb-1">Venue</p>
            <p className="font-medium text-[#1a1a1a]">Classroom 3, PG Building, KLE CBALC, Belagavi</p>
          </div>
          <div className="border-b border-[#e5e2d9] pb-4">
            <p className="text-xs tracking-widest uppercase text-[#999] mb-1">Registration</p>
            <p className="mb-2">Use the official registration form for team entries.</p>
            <a
              href="https://forms.gle/szVdWVhLMAos6Bqy7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a227] underline"
            >
              Open registration form →
            </a>
          </div>
        </div>

        <div className="mt-12">
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
    </div>
  );
}
