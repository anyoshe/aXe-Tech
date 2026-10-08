"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
import { LEAD_STAGES } from "@/lib/partner-constants";

type Lead = {
  id: string;
  org_name: string;
  contact_name: string;
  phone: string;
  email?: string | null;
  county?: string | null;
  customer_type?: string;
  stage: string;
  pillar: string;
  follow_up_at: string | null;
  protected_until: string | null;
  requirement: string;
  expected_value?: number | null;
  next_action?: string | null;
  updated_at: string;
};

export default function PartnerDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [partner, setPartner] = useState<{
    full_name?: string;
    status?: string;
    specialty?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role === "admin") {
      router.push("/admin/leads");
    }
  }, [status, session, router]);

  async function load() {
    try {
      const [meRes, leadRes] = await Promise.all([
        fetch("/api/partners/me"),
        fetch("/api/leads"),
      ]);
      const me = await meRes.json();
      const ld = await leadRes.json();
      if (!meRes.ok) throw new Error(me.error || "Auth error");
      if (!leadRes.ok) throw new Error(ld.error || "Could not load leads");
      setPartner(me.partner || null);
      setLeads(ld.leads || []);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "partner") load();
  }, [status, session]);

  async function setStage(id: string, stage: string) {
    setUpdating(id);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    await load();
    setUpdating(null);
  }

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "ALL" && l.stage !== filter) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        l.org_name.toLowerCase().includes(s) ||
        l.contact_name.toLowerCase().includes(s) ||
        l.phone.includes(s) ||
        (l.requirement || "").toLowerCase().includes(s)
      );
    });
  }, [leads, filter, q]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-[#070b12] text-white flex items-center justify-center">
        Loading CRM…
      </div>
    );
  }

  const followUps = leads.filter(
    (l) => l.follow_up_at && new Date(l.follow_up_at) <= new Date(Date.now() + 86400000 * 3)
  );

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="Partner CRM"
          subtitle={`${partner?.full_name || session.user?.name || "Partner"} · ${partner?.status || ""} · ${partner?.specialty || ""}`}
          nav={[
            { href: "/partners/dashboard", label: "Leads", active: true },
            { href: "/partners/quotes", label: "Quotes" },
            { href: "/partners/commissions", label: "Commissions" },
            { href: "/partners/training", label: "Training" },
          ]}
          actions={
            <>
              <Link
                href="/partners/leads/new"
                className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm"
              >
                + New lead
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/partners/login" })}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                Sign out
              </button>
            </>
          }
        >
          {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Open leads" value={leads.length} />
            <CrmStat label="Follow-ups (3d)" value={followUps.length} />
            <CrmStat
              label="Won / payment"
              value={leads.filter((l) => l.stage === "WON" || l.stage === "PAYMENT").length}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search organisation, contact, phone…"
              className="flex-1 min-w-[200px] rounded-lg bg-[#0f1624] border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg bg-[#0f1624] border border-white/10 px-3 py-2.5 text-sm"
            >
              <option value="ALL">All stages</option>
              {LEAD_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <CrmMobileCards>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-white/40 py-10">No leads match.</p>
            )}
            {filtered.map((l) => (
              <CrmCard
                key={l.id}
                title={l.org_name}
                badge={<StageBadge stage={l.stage} />}
                onClick={() => setSelected(l)}
                footer={
                  <select
                    value={l.stage}
                    disabled={updating === l.id}
                    onChange={(e) => setStage(l.id, e.target.value)}
                    className="w-full bg-[#0a101c] border border-white/10 rounded-lg px-3 py-2 text-sm"
                  >
                    {LEAD_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                }
              >
                <CrmCardField label="Contact" value={l.contact_name} />
                <CrmCardField label="Phone" value={l.phone} />
                {l.county && <CrmCardField label="County" value={l.county} />}
                <CrmCardField label="Pillar" value={<span className="capitalize">{l.pillar}</span>} />
                <CrmCardField
                  label="Value"
                  value={
                    l.expected_value != null
                      ? `KSh ${Number(l.expected_value).toLocaleString()}`
                      : "—"
                  }
                />
                <CrmCardField
                  label="Follow-up"
                  value={l.follow_up_at ? new Date(l.follow_up_at).toLocaleDateString() : "—"}
                />
                <p className="text-xs text-white/45 line-clamp-2 pt-1">{l.requirement}</p>
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable
            columns={[
              "Organisation",
              "Contact",
              "Pillar",
              "Stage",
              "Value (KES)",
              "Follow-up",
              "Protected until",
              "Updated",
            ]}
            empty="No leads match. Register your first opportunity."
          >
            {filtered.map((l) => (
              <CrmRow key={l.id} onClick={() => setSelected(l)}>
                <CrmCell>
                  <div className="font-semibold text-white">{l.org_name}</div>
                  <div className="text-xs text-white/45 mt-1 line-clamp-2 max-w-[220px]">
                    {l.requirement}
                  </div>
                  {l.customer_type && (
                    <div className="text-[10px] uppercase tracking-wide text-white/35 mt-1">
                      {l.customer_type}
                    </div>
                  )}
                </CrmCell>
                <CrmCell>
                  <div>{l.contact_name}</div>
                  <div className="text-xs text-white/50 mt-0.5">{l.phone}</div>
                  {l.email && <div className="text-xs text-white/40">{l.email}</div>}
                  {l.county && <div className="text-xs text-white/35 mt-0.5">{l.county}</div>}
                </CrmCell>
                <CrmCell>
                  <span className="capitalize text-white/80">{l.pillar}</span>
                </CrmCell>
                <CrmCell>
                  <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                    <StageBadge stage={l.stage} />
                    <select
                      value={l.stage}
                      disabled={updating === l.id}
                      onChange={(e) => setStage(l.id, e.target.value)}
                      className="bg-[#0a101c] border border-white/10 rounded-md px-2 py-1 text-xs max-w-[140px]"
                    >
                      {LEAD_STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </CrmCell>
                <CrmCell className="tabular-nums">
                  {l.expected_value != null
                    ? Number(l.expected_value).toLocaleString()
                    : "—"}
                </CrmCell>
                <CrmCell muted>
                  {l.follow_up_at ? new Date(l.follow_up_at).toLocaleString() : "—"}
                  {l.next_action && (
                    <div className="text-xs text-white/40 mt-1 max-w-[140px]">{l.next_action}</div>
                  )}
                </CrmCell>
                <CrmCell muted>
                  {l.protected_until
                    ? new Date(l.protected_until).toLocaleDateString()
                    : "—"}
                </CrmCell>
                <CrmCell muted>
                  {new Date(l.updated_at).toLocaleDateString()}
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>

          {/* Detail panel */}
          {selected && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setSelected(null)}>
              <div
                className="w-full max-w-md h-full bg-[#0c1220] border-l border-white/10 p-6 overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">Lead detail</p>
                    <h2 className="text-xl font-bold mt-1">{selected.org_name}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-white/50 hover:text-white text-sm"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-4">
                  <StageBadge stage={selected.stage} />
                </div>
                <dl className="mt-6 space-y-4 text-sm">
                  {[
                    ["Contact", selected.contact_name],
                    ["Phone", selected.phone],
                    ["Email", selected.email || "—"],
                    ["County", selected.county || "—"],
                    ["Type", selected.customer_type || "—"],
                    ["Pillar", selected.pillar],
                    ["Expected value", selected.expected_value != null ? `KSh ${Number(selected.expected_value).toLocaleString()}` : "—"],
                    ["Next action", selected.next_action || "—"],
                    ["Follow-up", selected.follow_up_at ? new Date(selected.follow_up_at).toLocaleString() : "—"],
                    ["Protected until", selected.protected_until ? new Date(selected.protected_until).toLocaleDateString() : "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-white/5 pb-3">
                      <dt className="text-[11px] uppercase tracking-wider text-white/40">{k}</dt>
                      <dd className="mt-1 text-white/90">{v}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-white/40">Requirement</dt>
                    <dd className="mt-1 text-white/80 leading-relaxed whitespace-pre-wrap">
                      {selected.requirement}
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/partners/quotes"
                  className="mt-8 inline-flex rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2.5 text-sm"
                >
                  Request quote for this client
                </Link>
              </div>
            </div>
          )}
        </CrmShell>
      </main>
    </>
  );
}
