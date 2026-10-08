"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NewLeadPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    org_name: "",
    contact_name: "",
    phone: "",
    email: "",
    location: "",
    county: "",
    industry: "",
    customer_type: "sme",
    requirement: "",
    pillar: "equip",
    expected_value: "",
    next_action: "",
    follow_up_at: "",
    campaign_code: "",
    referral_code: "",
  });

  if (status === "unauthenticated") {
    if (typeof window !== "undefined") router.push("/partners/login");
  }

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          expected_value: form.expected_value ? Number(form.expected_value) : null,
          follow_up_at: form.follow_up_at || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/partners/dashboard");
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
          <Link href="/partners/dashboard" className="text-sm text-white/60 hover:text-[var(--color-accent)]">
            ← Dashboard
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Register lead</h1>
          <p className="text-sm text-white/55 mt-1">
            First valid registration owns the lead (protection window applies).
          </p>
          <form onSubmit={submit} className="mt-8 space-y-3">
            {(
              [
                ["org_name", "Organisation / school", "text", true],
                ["contact_name", "Contact person", "text", true],
                ["phone", "Phone", "tel", true],
                ["email", "Email", "email", false],
                ["location", "Location", "text", false],
                ["county", "County", "text", false],
                ["industry", "Industry", "text", false],
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
              <label className="text-xs text-white/50">Customer type</label>
              <select
                value={form.customer_type}
                onChange={(e) => set("customer_type", e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              >
                {["school", "sme", "chama", "ngo", "government", "individual", "other"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50">Pillar</label>
              <select
                value={form.pillar}
                onChange={(e) => set("pillar", e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              >
                <option value="equip">EQUIP — Hardware</option>
                <option value="connect">CONNECT — Labs / network</option>
                <option value="run">RUN — Software</option>
                <option value="support">SUPPORT — Maintenance</option>
                <option value="mixed">Mixed solution</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50">Requirement</label>
              <textarea
                required
                value={form.requirement}
                onChange={(e) => set("requirement", e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/50">Expected value (KES, optional)</label>
              <input
                type="number"
                value={form.expected_value}
                onChange={(e) => set("expected_value", e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/50">Next action</label>
              <input
                value={form.next_action}
                onChange={(e) => set("next_action", e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/50">Follow-up date</label>
              <input
                type="datetime-local"
                value={form.follow_up_at}
                onChange={(e) => set("follow_up_at", e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/50">Campaign code (optional)</label>
              <input
                value={form.campaign_code}
                onChange={(e) => set("campaign_code", e.target.value)}
                placeholder="e.g. SCHOOL2026"
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-white/50">Referral code (optional)</label>
              <input
                value={form.referral_code}
                onChange={(e) => set("referral_code", e.target.value)}
                placeholder="Partner GX… code"
                className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm font-mono"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-3 text-sm"
            >
              {loading ? "Saving…" : "Save lead"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
