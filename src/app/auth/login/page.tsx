"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen paper-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Link href="/" className="font-display text-sm tracking-[0.2em] uppercase block mb-10">
          PAPER FASHION WALK
        </Link>
        <h1 className="heading-lg mb-2">Admin Login</h1>
        <p className="text-[#666] text-sm mb-10 font-sans-ui">Sign in to manage the event</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field">Email</label>
            <input
              type="email"
              className="input-field"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input
              type="password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans-ui">
              {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
