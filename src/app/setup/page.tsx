"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "required" | "done">("loading");
  const [form, setForm] = useState({ name: "Super Admin", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/setup")
      .then((r) => r.json())
      .then((data) => {
        if (data.setupRequired) setStatus("required");
        else setStatus("done");
      })
      .catch(() => setStatus("required"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Setup failed");
      setMessage("Setup complete! Redirecting to login…");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center paper-bg">
        <p className="font-sans-ui text-sm text-[#666]">Checking setup status…</p>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center paper-bg">
        <div className="text-center max-w-md px-6">
          <h1 className="heading-lg mb-4">Setup Already Complete</h1>
          <p className="text-[#666] text-sm mb-8 font-sans-ui">
            An administrator account already exists. Please log in.
          </p>
          <a href="/auth/login" className="btn-primary">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen paper-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <p className="font-sans-ui text-xs tracking-[0.3em] uppercase text-[#c9a227] mb-3">First-time Setup</p>
        <h1 className="heading-lg mb-2">Create Super Admin</h1>
        <p className="text-[#666] text-sm mb-10 font-sans-ui">
          This creates the first administrator and seeds the PAPER FASHION WALK 2026 event.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field">Name</label>
            <input
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
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
            <label className="label-field">Password * (min 8 characters)</label>
            <input
              type="password"
              className="input-field"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans-ui">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm font-sans-ui">
              {message}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Creating…" : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
