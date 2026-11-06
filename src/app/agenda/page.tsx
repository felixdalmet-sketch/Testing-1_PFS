import Link from "next/link";

const schedule = [
  { time: "8:00 – 8:30 AM", activity: "Organising team reporting, room inspection and setup", lead: "Event coordinator and operations team" },
  { time: "8:30 – 9:00 AM", activity: "Team check-in, attendance and outfit readiness check", lead: "Registration and participant support" },
  { time: "9:00 – 9:10 AM", activity: "Welcome and opening announcement", lead: "Host" },
  { time: "9:10 – 9:20 AM", activity: "Event purpose, theme and rules briefing", lead: "Event coordinator" },
  { time: "9:20 – 9:30 AM", activity: "Judges' introduction and scoring explanation", lead: "Host / judging coordinator" },
  { time: "9:30 – 9:40 AM", activity: "Team lineup and order confirmation", lead: "Stage and participant coordinators" },
  { time: "9:40 – 10:40 AM", activity: "Paper Fashion Walk presentations: Teams 1–4", lead: "Host and runway coordinator" },
  { time: "10:40 – 10:50 AM", activity: "Short reset and classroom ventilation break", lead: "Operations team" },
  { time: "10:50 – 11:50 AM", activity: "Paper Fashion Walk presentations: Teams 5–8", lead: "Host and runway coordinator" },
  { time: "11:50 AM – 12:10 PM", activity: "Judges' review and score consolidation", lead: "Judging coordinator" },
  { time: "12:10 – 12:25 PM", activity: "Audience interaction and participant group photographs", lead: "Host and media team" },
  { time: "12:25 – 12:45 PM", activity: "Results, awards and recognition", lead: "Judges / faculty representative" },
  { time: "12:45 – 12:55 PM", activity: "Vote of thanks and closing remarks", lead: "Event coordinator" },
  { time: "12:55 – 1:30 PM", activity: "Pack-down, room restoration and final inspection", lead: "All organising teams" },
];

export default function AgendaPage() {
  return (
    <div className="min-h-screen paper-bg">
      <header className="border-b border-[#e5e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase">
            PAPER FASHION WALK
          </Link>
          <div className="flex items-center gap-6 font-sans-ui text-xs tracking-widest uppercase">
            <Link href="/about" className="hidden md:inline hover:text-[#c9a227]">About</Link>
            <Link href="/venue" className="hidden md:inline hover:text-[#c9a227]">Venue</Link>
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
          Programme
        </p>
        <h1 className="heading-lg mb-2">Event Agenda</h1>
        <p className="text-[#666] font-sans-ui text-sm mb-4">
          Saturday, 7 November 2026 · 9:00 AM – 1:30 PM
        </p>
        <div className="accent-line w-16 mb-12" />

        <p className="text-[#555] text-sm mb-10 max-w-2xl leading-relaxed">
          The programme is designed to finish by 1:30 PM and includes check-in, briefing,
          runway presentations, judging and prize distribution. Each team receives a maximum
          of 3 minutes for its full presentation.
        </p>

        <div className="bg-white border border-[#e5e2d9]">
          {schedule.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-6 px-5 py-4 ${
                i !== schedule.length - 1 ? "border-b border-[#f0ede6]" : ""
              }`}
            >
              <div className="font-sans-ui text-xs tracking-wide text-[#c9a227] md:pt-0.5">
                {item.time}
              </div>
              <div>
                <p className="font-medium text-[#1a1a1a] text-sm md:text-base">{item.activity}</p>
                <p className="font-sans-ui text-xs text-[#999] mt-1">{item.lead}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-6 border border-[#e5e2d9] bg-white/60">
          <h2 className="font-display text-lg mb-3">Runway presentation sequence</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-[#555]">
            <li>Host announces the team number and team name.</li>
            <li>Team enters the runway area in the confirmed order.</li>
            <li>Model(s) complete the planned walk and pause at the display point.</li>
            <li>A team representative gives a concise 30–45 second concept explanation.</li>
            <li>Model(s) complete the exit walk and return to the waiting area.</li>
            <li>Judges record scores independently before the next team begins.</li>
          </ol>
        </div>

        <div className="mt-12 text-center">
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
