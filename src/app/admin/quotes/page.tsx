"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

type Quote = {
  id: string;
  pillar: string;
  solution_summary: string;
  status: string;
  qualification: Record<string, string>;
  approved_setup_fee?: number | null;
  approved_monthly_fee?: number | null;
  approved_one_off?: number | null;
  created_at?: string;
  partners?: { full_name: string; email: string } | null;
  leads?: { org_name: string; phone: string } | null;
};

export default function AdminQuotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [setup, setSetup] = useState<Record<string, string>>({});
  const [monthly, setMonthly] = useState<Record<string, string>>({});
  const [oneOff, setOneOff] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/quotes");
    const d = await res.json();
    if (res.ok) setQuotes(d.quotes || []);
  }
  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function approve(id: string) {
    await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "APPROVED",
        approved_setup_fee: setup[id] ? Number(setup[id]) : null,
        approved_monthly_fee: monthly[id] ? Number(monthly[id]) : null,
        approved_one_off: oneOff[id] ? Number(oneOff[id]) : null,
        approved_notes: notes[id] || null,
      }),
    });
    load();
  }

  async function reject(id: string) {
    await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "REJECTED", approved_notes: notes[id] || "Rejected" }),
    });
    load();
  }

  const pending = quotes.filter((q) => q.status === "PENDING").length;

  function ApproveFields({ id }: { id: string }) {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input
            placeholder="Setup fee"
            value={setup[id] || ""}
            onChange={(e) => setSetup({ ...setup, [id]: e.target.value })}
            className="rounded-lg bg-[#0a101c] border border-white/10 px-2 py-2 text-sm"
          />
          <input
            placeholder="Monthly"
            value={monthly[id] || ""}
            onChange={(e) => setMonthly({ ...monthly, [id]: e.target.value })}
            className="rounded-lg bg-[#0a101c] border border-white/10 px-2 py-2 text-sm"
          />
          <input
            placeholder="One-off"
            value={oneOff[id] || ""}
            onChange={(e) => setOneOff({ ...oneOff, [id]: e.target.value })}
            className="rounded-lg bg-[#0a101c] border border-white/10 px-2 py-2 text-sm"
          />
          <input
            placeholder="Notes"
            value={notes[id] || ""}
            onChange={(e) => setNotes({ ...notes, [id]: e.target.value })}
            className="rounded-lg bg-[#0a101c] border border-white/10 px-2 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => approve(id)}
            className="flex-1 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold text-sm py-2"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => reject(id)}
            className="flex-1 rounded-lg border border-red-400/40 text-red-300 text-sm py-2"
          >
            Reject
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Quote approval"
          subtitle="Partners submit requests. You set approved setup / monthly / one-off amounts."
          nav={[
            { href: "/admin/leads", label: "Leads" },
            { href: "/admin/partners", label: "Partners" },
            { href: "/admin/quotes", label: "Quotes", active: true },
            { href: "/admin/deals", label: "Deals" },
            { href: "/admin/commissions", label: "Commissions" },
          ]}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Total" value={quotes.length} />
            <CrmStat label="Pending review" value={pending} />
            <CrmStat
              label="Approved"
              value={quotes.filter((q) => q.status === "APPROVED").length}
            />
          </div>

          <CrmMobileCards>
            {quotes.length === 0 && (
              <p className="text-center text-sm text-white/40 py-10">No quote requests.</p>
            )}
            {quotes.map((q) => (
              <CrmCard
                key={q.id}
                title={q.leads?.org_name || "—"}
                badge={<StageBadge stage={q.status} />}
                footer={q.status === "PENDING" ? <ApproveFields id={q.id} /> : undefined}
              >
                <CrmCardField label="Partner" value={q.partners?.full_name || "—"} />
                <CrmCardField label="Pillar" value={<span className="capitalize">{q.pillar}</span>} />
                <p className="text-xs text-white/60 leading-relaxed">{q.solution_summary}</p>
                <p className="text-[10px] text-white/35">Qual: {JSON.stringify(q.qualification || {})}</p>
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable
            columns={[
              "Client",
              "Partner",
              "Pillar",
              "Summary",
              "Status",
              "Review / amounts",
            ]}
          >
            {quotes.map((q) => (
              <CrmRow key={q.id}>
                <CrmCell>
                  <div className="font-semibold">{q.leads?.org_name || "—"}</div>
                  <div className="text-xs text-white/40">{q.leads?.phone}</div>
                </CrmCell>
                <CrmCell>
                  <div>{q.partners?.full_name}</div>
                  <div className="text-xs text-white/40">{q.partners?.email}</div>
                </CrmCell>
                <CrmCell className="capitalize">{q.pillar}</CrmCell>
                <CrmCell>
                  <div className="max-w-[240px] text-white/75 line-clamp-3">{q.solution_summary}</div>
                </CrmCell>
                <CrmCell>
                  <StageBadge stage={q.status} />
                </CrmCell>
                <CrmCell>
                  {q.status === "PENDING" ? (
                    <ApproveFields id={q.id} />
                  ) : (
                    <div className="text-xs text-white/50 space-y-0.5">
                      <div>Setup: {q.approved_setup_fee ?? "—"}</div>
                      <div>Monthly: {q.approved_monthly_fee ?? "—"}</div>
                      <div>One-off: {q.approved_one_off ?? "—"}</div>
                    </div>
                  )}
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
