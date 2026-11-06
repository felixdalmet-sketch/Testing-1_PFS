"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [ticketTypeId, setTicketTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ registrationId: string; ticketNumber: string } | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    teamName: "",
    teamSize: 3,
    designTitle: "",
    conceptNote: "",
    materialsNote: "",
    modelNames: "",
  });

  useEffect(() => {
    fetch("/api/public/event")
      .then((r) => r.json())
      .then((data) => {
        if (data.event) {
          setEventId(data.event.id);
          if (data.ticketTypes?.[0]) setTicketTypeId(data.ticketTypes[0].id);
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          ticketTypeId: ticketTypeId || undefined,
          ...form,
          teamSize: Number(form.teamSize),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess({
        registrationId: data.registration.registrationId,
        ticketNumber: data.ticket.ticketNumber,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen paper-bg">
        <header className="border-b border-[#e5e2d9]">
          <div className="max-w-3xl mx-auto px-6 py-5">
            <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase">
              PAPER FASHION WALK
            </Link>
          </div>
        </header>
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-4">Success</p>
          <h1 className="heading-lg mb-6">Registration Confirmed</h1>
          <div className="accent-line w-16 mx-auto mb-10" />
          <div className="bg-white border border-[#e5e2d9] p-8 text-left font-sans-ui text-sm space-y-3 mb-10">
            <div className="flex justify-between">
              <span className="text-[#999]">Registration ID</span>
              <span className="font-medium">{success.registrationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">Ticket Number</span>
              <span className="font-medium">{success.ticketNumber}</span>
            </div>
          </div>
          <p className="text-[#666] text-sm mb-8">
            A confirmation email with your QR code has been sent (if email is configured).
            Please save your registration and ticket numbers.
          </p>
          <Link href={`/ticket?reg=${success.registrationId}`} className="btn-primary">
            View Ticket
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen paper-bg">
      <header className="border-b border-[#e5e2d9]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase">
            PAPER FASHION WALK
          </Link>
          <Link href="/" className="font-sans-ui text-xs tracking-widest uppercase hover:text-[#c9a227]">
            Back
          </Link>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 py-16">
        <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-3">Team Registration</p>
        <h1 className="heading-lg mb-2">Join the Runway</h1>
        <p className="text-[#666] text-sm mb-10 font-sans-ui">
          Free entry • 2–5 members per team • 8 team slots
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label-field">Team Name *</label>
            <input
              className="input-field"
              required
              value={form.teamName}
              onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              placeholder="Your team name"
            />
          </div>
          <div>
            <label className="label-field">Team Leader Full Name *</label>
            <input
              className="input-field"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-field">Email *</label>
              <input
                type="email"
                className="input-field"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label-field">Mobile *</label>
              <input
                className="input-field"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label-field">Team Size (2–5) *</label>
            <input
              type="number"
              min={2}
              max={5}
              className="input-field"
              required
              value={form.teamSize}
              onChange={(e) => setForm({ ...form, teamSize: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="label-field">Design / Outfit Title *</label>
            <input
              className="input-field"
              required
              value={form.designTitle}
              onChange={(e) => setForm({ ...form, designTitle: e.target.value })}
            />
          </div>
          <div>
            <label className="label-field">Concept Note (50–100 words) *</label>
            <textarea
              className="input-field min-h-[100px]"
              required
              value={form.conceptNote}
              onChange={(e) => setForm({ ...form, conceptNote: e.target.value })}
              placeholder="Describe the inspiration and design idea"
            />
          </div>
          <div>
            <label className="label-field">Materials Used *</label>
            <textarea
              className="input-field min-h-[80px]"
              required
              value={form.materialsNote}
              onChange={(e) => setForm({ ...form, materialsNote: e.target.value })}
              placeholder="Newspaper, kraft paper, cardboard, etc."
            />
          </div>
          <div>
            <label className="label-field">Model Name(s) *</label>
            <input
              className="input-field"
              required
              value={form.modelNames}
              onChange={(e) => setForm({ ...form, modelNames: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans-ui">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading || !eventId} className="btn-primary w-full">
            {loading ? "Submitting…" : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
