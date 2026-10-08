"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PartnerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: email.trim(),
      password,
    });

    if (res?.error) {
      setLoading(false);
      setError(
        "Login failed. For admin: set ADMIN_EMAIL and ADMIN_PASSWORD on Vercel (Production), set NEXTAUTH_URL=https://getaxekenya.com, then Redeploy. For partners: account must be APPROVED+."
      );
      return;
    }

    // Wait for session cookie to be readable
    let role: string | undefined;
    for (let i = 0; i < 8; i++) {
      const session = await getSession();
      role = (session?.user as { role?: string } | undefined)?.role;
      if (role) break;
      await new Promise((r) => setTimeout(r, 150));
    }

    setLoading(false);

    if (role === "admin") {
      router.replace("/admin/partners");
      return;
    }
    if (role === "partner") {
      router.replace("/partners/dashboard");
      return;
    }

    setError(
      "Signed in but no role on session. Check NEXTAUTH_SECRET and NEXTAUTH_URL on Vercel, then clear site cookies and try again."
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white flex items-center">
        <div className="max-w-md w-full mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold">Partner / Admin login</h1>
          <p className="mt-2 text-sm text-white/60">
            Partners sign in after approval. Admin uses the email/password from Vercel env vars{" "}
            <code className="text-white/80">ADMIN_EMAIL</code> /{" "}
            <code className="text-white/80">ADMIN_PASSWORD</code>.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs text-white/50">Email</label>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/50">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-400 whitespace-pre-wrap">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-3 text-sm disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-sm text-white/50">
            New partner?{" "}
            <Link href="/partners/apply" className="text-[var(--color-accent)]">
              Apply here
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
