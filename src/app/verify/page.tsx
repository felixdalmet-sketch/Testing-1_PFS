"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`/api/tickets/verify?token=${token}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <p className="font-sans-ui text-sm text-[#666]">Verifying ticket…</p>;
  }

  if (!token || !data) {
    return <p className="font-sans-ui text-sm text-red-600">Invalid or missing ticket token.</p>;
  }

  return (
    <div className="bg-white border border-[#e5e2d9] p-8 max-w-md w-full">
      <p className={`text-xs tracking-widest uppercase mb-4 ${
        data.valid && !data.alreadyCheckedIn ? "text-green-600" : "text-[#c9a227]"
      }`}>
        {data.status} {data.alreadyCheckedIn ? "• ALREADY CHECKED IN" : ""}
      </p>
      <h1 className="text-xl font-display mb-6">{data.registration?.fullName}</h1>
      <div className="space-y-3 font-sans-ui text-sm">
        <div className="flex justify-between border-b border-[#f0ede6] pb-2">
          <span className="text-[#999]">Registration</span>
          <span>{data.registration?.registrationId}</span>
        </div>
        <div className="flex justify-between border-b border-[#f0ede6] pb-2">
          <span className="text-[#999]">Ticket</span>
          <span>{data.ticket?.ticketNumber}</span>
        </div>
        {data.registration?.teamName && (
          <div className="flex justify-between border-b border-[#f0ede6] pb-2">
            <span className="text-[#999]">Team</span>
            <span>{data.registration.teamName}</span>
          </div>
        )}
        {data.registration?.designTitle && (
          <div className="flex justify-between border-b border-[#f0ede6] pb-2">
            <span className="text-[#999]">Design</span>
            <span>{data.registration.designTitle}</span>
          </div>
        )}
        <div className="flex justify-between border-b border-[#f0ede6] pb-2">
          <span className="text-[#999]">Event</span>
          <span>{data.event?.name}</span>
        </div>
        {data.lastCheckIn && (
          <div className="flex justify-between pt-2 text-[#666]">
            <span>Checked in</span>
            <span>{new Date(data.lastCheckIn.at).toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-6">
      <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase mb-10">
        PAPER FASHION WALK
      </Link>
      <Suspense fallback={<p className="font-sans-ui text-sm">Loading…</p>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
