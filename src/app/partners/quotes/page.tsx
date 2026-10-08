"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CrmShell,
  CrmStat,
  CrmTable,
  CrmRow,
  CrmCell,
  StageBadge,
  CrmMobileCards,
  CrmCard,
  CrmCardField,
} from "@/components/crm/CrmShell";
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
  qualification?: Record<string, string>;
  leads?: { org_name: string } | null;
};

type Lead = { id: string; org_name: string };

export default function PartnerQuotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(false);
    load();
  }

  const pending = quotes.filter((q) => q.status === "PENDING").length;
  const approved = quotes.filter((q) => q.status === "APPROVED").length;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="Quotes"
          subtitle="Submit qualification — GetAxe approves final prices. You never invent complex software prices."
          nav={[
            { href: "/partners/dashboard", label: "Leads" },
            { href: "/partners/onboarding", label: "Onboarding" },
            { href: "/partners/quotes", label: "Quotes", active: true },
            { href: "/partners/commissions", label: "Commissions" },
            { href: "/partners/training", label: "Training" },
          ]}
          actions={
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm"
            >
              {showForm ? "Close" : "+ Request quote"}
            </button>
          }
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Total" value={quotes.length} />
            <CrmStat label="Pending" value={pending} />
            <CrmStat label="Approved" value={approved} />
          </div>

          <div className="mb-6 grid sm:grid-cols-3 gap-3">
            {SOFTWARE_TIERS.map((t) => (
              <div key={t.id} className="rounded-xl border border-white/10 bg-[#0f1624] p-4 text-xs">
                <p className="font-semibold text-[var(--color-accent)] text-sm">{t.name}</p>
                <p className="text-white/45 mt-1">{t.persona}</p>
                <p className="mt-2 text-white/70">Setup ~KSh {t.setup.toLocaleString()}</p>
                <p className="text-white/70">
                  Monthly ~{t.monthlyMin.toLocaleString()}–{t.monthlyMax.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {showForm && (
            <form
              onSubmit={submit}
              className="mb-8 space-y-3 rounded-2xl border border-white/10 bg-[#0f1624] p-5"
            >
              <h2 className="font-semibold text-sm">New quote request</h2>
              <select
                value={form.lead_id}
                onChange={(e) => setForm({ ...form, lead_id: e.target.value })}
                className="w-full rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
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
                className="w-full rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
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
                className="w-full rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
                rows={3}
              />
              <div className="grid sm:grid-cols-2 gap-2">
                <input
                  placeholder="Users / students"
                  value={form.users}
                  onChange={(e) => setForm({ ...form, users: e.target.value })}
                  className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Branches"
                  value={form.branches}
                  onChange={(e) => setForm({ ...form, branches: e.target.value })}
                  className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Modules needed"
                  value={form.modules}
                  onChange={(e) => setForm({ ...form, modules: e.target.value })}
                  className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Budget range"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2.5 text-sm"
              >
                Submit for approval
              </button>
            </form>
          )}

          <CrmMobileCards>
            {quotes.length === 0 && (
              <p className="text-center text-sm text-white/40 py-10">No quote requests yet.</p>
            )}
            {quotes.map((q) => (
              <CrmCard
                key={q.id}
                title={q.leads?.org_name || "General request"}
                badge={<StageBadge stage={q.status} />}
              >
                <CrmCardField label="Pillar" value={<span className="capitalize">{q.pillar}</span>} />
                <CrmCardField
                  label="Submitted"
                  value={new Date(q.created_at).toLocaleDateString()}
                />
                <p className="text-xs text-white/55 leading-relaxed">{q.solution_summary}</p>
                {q.status === "APPROVED" && (
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs space-y-1">
                    <p>Setup: {q.approved_setup_fee != null ? `KSh ${Number(q.approved_setup_fee).toLocaleString()}` : "—"}</p>
                    <p>Monthly: {q.approved_monthly_fee != null ? `KSh ${Number(q.approved_monthly_fee).toLocaleString()}` : "—"}</p>
                    <p>One-off: {q.approved_one_off != null ? `KSh ${Number(q.approved_one_off).toLocaleString()}` : "—"}</p>
                    {q.approved_notes && <p className="text-white/50">{q.approved_notes}</p>}
                    <Link href={`/partners/quotes/${q.id}/print`} className="inline-block mt-2 text-[var(--color-accent)] font-medium">
                      Print / PDF →
                    </Link>
                  </div>
                )}
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable
            columns={[
              "Client / lead",
              "Pillar",
              "Summary",
              "Status",
              "Approved amounts",
              "Submitted",
            ]}
          >
            {quotes.map((q) => (
              <CrmRow key={q.id}>
                <CrmCell>
                  <div className="font-semibold">{q.leads?.org_name || "General"}</div>
                </CrmCell>
                <CrmCell className="capitalize">{q.pillar}</CrmCell>
                <CrmCell>
                  <div className="text-white/75 max-w-[280px] line-clamp-2">{q.solution_summary}</div>
                </CrmCell>
                <CrmCell>
                  <StageBadge stage={q.status} />
                </CrmCell>
                <CrmCell muted>
                  {q.status === "APPROVED" ? (
                    <div className="text-xs space-y-0.5">
                      <div>Setup: {q.approved_setup_fee != null ? Number(q.approved_setup_fee).toLocaleString() : "—"}</div>
                      <div>Monthly: {q.approved_monthly_fee != null ? Number(q.approved_monthly_fee).toLocaleString() : "—"}</div>
                      <div>One-off: {q.approved_one_off != null ? Number(q.approved_one_off).toLocaleString() : "—"}</div>
                      <Link href={`/partners/quotes/${q.id}/print`} className="text-[var(--color-accent)]">Print</Link>
                    </div>
                  ) : (
                    "—"
                  )}
                </CrmCell>
                <CrmCell muted>{new Date(q.created_at).toLocaleDateString()}</CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
