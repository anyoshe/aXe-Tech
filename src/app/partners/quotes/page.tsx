"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SOFTWARE_TIERS } from "@/lib/commissions";

type Quote = {
  id: string;
  pillar: string;
  solution_summary: string;
  status: string;
  approved_setup_fee: number | null;
  approved_monthly_fee: number | null;
  approved_one_off: number | null;
  approved_notes: string | null;
  created_at: string;
  leads?: { org_name: string } | null;
};

type Lead = { id: string; org_name: string };

export default function PartnerQuotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    lead_id: "",
    pillar: "run",
    solution_summary: "",
    users: "",
    branches: "",
    modules: "",
    budget: "",
    requested_amount: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
  }, [status, router]);

  async function load() {
    const [q, l] = await Promise.all([fetch("/api/quotes"), fetch("/api/leads")]);
    const qd = await q.json();
    const ld = await l.json();
    if (q.ok) setQuotes(qd.quotes || []);
    if (l.ok) setLeads(ld.leads || []);
  }

  useEffect(() => {
    if (session?.user?.role === "partner" || session?.user?.role === "admin") load();
  }, [session]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lead_id: form.lead_id || null,
        pillar: form.pillar,
        solution_summary: form.solution_summary,
        requested_amount: form.requested_amount || null,
        qualification: {
          users: form.users,
          branches: form.branches,
          modules: form.modules,
          budget: form.budget,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed");
      return;
    }
    setForm({
      lead_id: "",
      pillar: "run",
      solution_summary: "",
      users: "",
      branches: "",
      modules: "",
      budget: "",
      requested_amount: "",
    });
    load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <Link href="/partners/dashboard" className="text-sm text-white/60">
            ← Dashboard
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Quote requests</h1>
          <p className="text-sm text-white/55 mt-1">
            You never set final prices. Submit qualification; GetAxe approves amounts.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs">
            {SOFTWARE_TIERS.map((t) => (
              <div key={t.id} className="rounded-xl border border-white/10 p-3 bg-white/5">
                <p className="font-semibold text-[var(--color-accent)]">{t.name}</p>
                <p className="text-white/50 mt-1">{t.persona}</p>
                <p className="mt-2">Setup ~KSh {t.setup.toLocaleString()}</p>
                <p>
                  Monthly ~{t.monthlyMin.toLocaleString()}–{t.monthlyMax.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-3 rounded-2xl border border-white/10 p-5 bg-white/5">
            <h2 className="font-semibold">New quote request</h2>
            <select
              value={form.lead_id}
              onChange={(e) => setForm({ ...form, lead_id: e.target.value })}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
            >
              <option value="">Link lead (optional)</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.org_name}
                </option>
              ))}
            </select>
            <select
              value={form.pillar}
              onChange={(e) => setForm({ ...form, pillar: e.target.value })}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
            >
              <option value="equip">EQUIP</option>
              <option value="connect">CONNECT</option>
              <option value="run">RUN (software)</option>
              <option value="support">SUPPORT</option>
              <option value="mixed">Mixed</option>
            </select>
            <textarea
              required
              placeholder="Solution summary / client need"
              value={form.solution_summary}
              onChange={(e) => setForm({ ...form, solution_summary: e.target.value })}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              rows={3}
            />
            <div className="grid sm:grid-cols-2 gap-2">
              <input
                placeholder="Users / students"
                value={form.users}
                onChange={(e) => setForm({ ...form, users: e.target.value })}
                className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
              <input
                placeholder="Branches"
                value={form.branches}
                onChange={(e) => setForm({ ...form, branches: e.target.value })}
                className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
              <input
                placeholder="Modules needed"
                value={form.modules}
                onChange={(e) => setForm({ ...form, modules: e.target.value })}
                className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
              <input
                placeholder="Budget range"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm"
            >
              Submit for approval
            </button>
          </form>

          <h2 className="mt-10 font-semibold">My requests</h2>
          <div className="mt-3 space-y-3">
            {quotes.map((q) => (
              <div key={q.id} className="rounded-xl border border-white/10 p-4 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="font-medium">{q.leads?.org_name || "General"}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">{q.status}</span>
                </div>
                <p className="text-white/60 mt-1">{q.solution_summary}</p>
                {q.status === "APPROVED" && (
                  <p className="mt-2 text-[var(--color-accent)]">
                    Approved: setup {q.approved_setup_fee ?? "—"} · monthly {q.approved_monthly_fee ?? "—"} ·
                    one-off {q.approved_one_off ?? "—"}
                    {q.approved_notes ? ` — ${q.approved_notes}` : ""}
                  </p>
                )}
              </div>
            ))}
            {quotes.length === 0 && <p className="text-white/50 text-sm">No quote requests yet.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
