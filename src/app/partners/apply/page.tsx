"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PartnerApplyForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    county: "",
    occupation: "",
    specialty: "hardware",
    experience: "",
    target_market: "",
    network_notes: "",
    mpesa_number: "",
  });

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  useEffect(() => {
    const ref = searchParams.get("ref") || searchParams.get("referral");
    if (ref) {
      setForm((f) => ({
        ...f,
        network_notes: f.network_notes
          ? f.network_notes
          : `Referred by code: ${ref.toUpperCase()}`,
      }));
    }
  }, [searchParams]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-xl mx-auto px-4 py-12">
          <Link href="/partners" className="text-sm text-white/60 hover:text-[var(--color-accent)]">
            ← Partners
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Partner application</h1>
          <p className="mt-2 text-sm text-white/60">
            Independent contractor application. No guaranteed income. GetAxe reviews every application.
          </p>

          {done ? (
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
              <p className="font-semibold text-emerald-300">Application submitted</p>
              <p className="mt-2 text-sm text-white/70">
                We will screen your application. After approval you can sign in at Partner login.
              </p>
              <Link href="/partners/login" className="inline-block mt-4 text-[var(--color-accent)] text-sm font-semibold">
                Go to login →
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4">
              {(
                [
                  ["full_name", "Full name", "text", true],
                  ["email", "Email", "email", true],
                  ["phone", "Phone (WhatsApp)", "tel", true],
                  ["password", "Portal password (min 8)", "password", true],
                  ["mpesa_number", "M-Pesa number (for commissions later)", "tel", false],
                  ["county", "County", "text", false],
                  ["occupation", "Occupation", "text", false],
                ] as const
              ).map(([key, label, type, req]) => (
                <div key={key}>
                  <label className="text-xs text-white/50">{label}</label>
                  <input
                    required={req}
                    type={type}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-white/50">Primary specialty</label>
                <select
                  value={form.specialty}
                  onChange={(e) => set("specialty", e.target.value)}
                  className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                >
                  <option value="hardware">Hardware (EQUIP)</option>
                  <option value="software">Software (RUN)</option>
                  <option value="services">Labs / network / support</option>
                  <option value="mixed">Mixed portfolio</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50">Experience</label>
                <textarea
                  value={form.experience}
                  onChange={(e) => set("experience", e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-white/50">Target market</label>
                <input
                  value={form.target_market}
                  onChange={(e) => set("target_market", e.target.value)}
                  placeholder="Schools, SMEs, chamas…"
                  className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-white/50">Existing network / relationships</label>
                <textarea
                  value={form.network_notes}
                  onChange={(e) => set("network_notes", e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-3 text-sm disabled:opacity-50"
              >
                {loading ? "Submitting…" : "Submit application"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}


export default function PartnerApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg-dark)] text-white flex items-center justify-center">Loading…</div>}>
      <PartnerApplyForm />
    </Suspense>
  );
}
