import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen paper-bg">
      <header className="border-b border-[#e5e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between">
          <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase">PAPER FASHION WALK</Link>
          <Link href="/register" className="btn-primary !py-2 !px-5 text-xs">Register</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-4">About</p>
        <h1 className="heading-lg mb-8">Turn ordinary paper into extraordinary style.</h1>
        <div className="accent-line w-16 mb-10" />
        <div className="space-y-6 text-[#555] leading-relaxed">
          <p>
            PAPER FASHION WALK 2026 is a creative college runway event in which student participants
            conceptualise, construct and present fashion looks made primarily from paper.
          </p>
          <p>
            The event brings together fashion, craft, sustainability, teamwork, confidence and stage
            presentation in a compact classroom-based showcase at KLE CBALC, Belagavi.
          </p>
          <p>
            Participants present their creations on a defined runway path inside Classroom 3, PG Building.
            Each team introduces its concept, showcases the outfit and explains the materials and construction choices.
          </p>
          <h2 className="heading-lg text-2xl mt-12 mb-4 text-[#1a1a1a]">Objectives</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Encourage creativity using accessible, low-cost materials</li>
            <li>Promote awareness of reuse, recycling and responsible material choices</li>
            <li>Develop teamwork, planning and time-management skills</li>
            <li>Build confidence through stage presence and public presentation</li>
            <li>Recognise originality, craftsmanship and confident presentation</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
