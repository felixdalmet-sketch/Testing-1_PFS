import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");

  const [
    totalRegs,
    confirmed,
    pending,
    cancelled,
    checkedIn,
    event,
  ] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "CONFIRMED" } }),
    prisma.registration.count({ where: { status: "PENDING" } }),
    prisma.registration.count({ where: { status: "CANCELLED" } }),
    prisma.checkIn.count(),
    prisma.event.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  const recent = await prisma.registration.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { ticket: true, ticketType: true },
  });

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans-ui">
      <header className="bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#c9a227]">Admin</p>
            <h1 className="text-lg font-medium">{event?.name || "Event Dashboard"}</h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-[#aaa]">{session.user.email}</span>
            <Link href="/" className="text-[#c9a227] hover:underline">View Site</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { label: "Total Registrations", value: totalRegs },
            { label: "Confirmed", value: confirmed },
            { label: "Pending", value: pending },
            { label: "Cancelled", value: cancelled },
            { label: "Checked In", value: checkedIn },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#e5e2d9] p-5">
              <p className="text-xs tracking-widest uppercase text-[#999] mb-2">{s.label}</p>
              <p className="text-3xl font-display">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/admin/registrations" className="btn-outline !py-2 !px-5 text-xs">Registrations</Link>
          <Link href="/admin/checkin" className="btn-outline !py-2 !px-5 text-xs">QR Check-in</Link>
          <Link href="/admin/event" className="btn-outline !py-2 !px-5 text-xs">Event Config</Link>
          <Link href="/setup" className="btn-outline !py-2 !px-5 text-xs">Setup Status</Link>
        </div>

        <h2 className="text-sm tracking-widest uppercase text-[#999] mb-4">Recent Registrations</h2>
        <div className="bg-white border border-[#e5e2d9] overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e2d9] text-left text-xs tracking-widest uppercase text-[#999]">
                <th className="p-4">Reg ID</th>
                <th className="p-4">Name / Team</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ticket</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-b border-[#f0ede6]">
                  <td className="p-4 font-medium">{r.registrationId}</td>
                  <td className="p-4">
                    <div>{r.fullName}</div>
                    {r.teamName && <div className="text-xs text-[#999]">{r.teamName}</div>}
                  </td>
                  <td className="p-4">{r.email}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 ${
                      r.status === "CONFIRMED" ? "bg-green-50 text-green-700" :
                      r.status === "PENDING" ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-700"
                    }`}>{r.status}</span>
                  </td>
                  <td className="p-4">{r.ticket?.ticketNumber || "—"}</td>
                  <td className="p-4 text-[#666]">
                    {new Date(r.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#999]">
                    No registrations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
