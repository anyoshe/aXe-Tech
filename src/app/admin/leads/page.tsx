"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CrmShell,
  CrmStat,
  CrmTable,
  CrmRow,
  CrmCell,
  StageBadge,
} from "@/components/crm/CrmShell";
import { LEAD_STAGES } from "@/lib/partner-constants";

type Lead = {
  id: string;
  org_name: string;
  contact_name: string;
  phone: string;
  email?: string | null;
  county?: string | null;
  stage: string;
  pillar: string;
  requirement: string;
  expected_value?: number | null;
  protected_until: string | null;
  follow_up_at?: string | null;
  updated_at?: string;
  partners?: { full_name: string; email: string } | null;
};

export default function AdminLeadsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/partners/dashboard");
    }
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/leads");
    const data = await res.json();
    if (res.ok) setLeads(data.leads || []);
  }

  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function setStage(id: string, stage: string) {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    await load();
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
        (l.partners?.full_name || "").toLowerCase().includes(s)
      );
    });
  }, [leads, filter, q]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · All leads"
          subtitle="Company-wide pipeline. Partners only see their own leads."
          nav={[
            { href: "/admin/leads", label: "Leads", active: true },
            { href: "/admin/partners", label: "Partners" },
            { href: "/admin/quotes", label: "Quotes" },
            { href: "/admin/deals", label: "Deals" },
            { href: "/admin/commissions", label: "Commissions" },
          ]}
          actions={
            <Link
              href="/admin/products"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70"
            >
              Products
            </Link>
          }
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Total leads" value={leads.length} />
            <CrmStat
              label="In negotiation+"
              value={
                leads.filter((l) =>
                  ["NEGOTIATION", "QUOTE_SENT", "QUOTE_REQUEST", "WON", "PAYMENT"].includes(l.stage)
                ).length
              }
            />
            <CrmStat
              label="Won / paid"
              value={leads.filter((l) => ["WON", "PAYMENT", "DELIVERY"].includes(l.stage)).length}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search org, contact, partner…"
              className="flex-1 min-w-[200px] rounded-lg bg-[#0f1624] border border-white/10 px-4 py-2.5 text-sm"
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

          <CrmTable
            columns={[
              "Organisation",
              "Contact",
              "Owner partner",
              "Pillar",
              "Stage",
              "Value",
              "Protected",
              "Updated",
            ]}
            empty="No leads in the system yet."
          >
            {filtered.map((l) => (
              <CrmRow key={l.id} onClick={() => setSelected(l)}>
                <CrmCell>
                  <div className="font-semibold">{l.org_name}</div>
                  <div className="text-xs text-white/45 mt-1 line-clamp-2 max-w-[240px]">
                    {l.requirement}
                  </div>
                </CrmCell>
                <CrmCell>
                  <div>{l.contact_name}</div>
                  <div className="text-xs text-white/50 mt-0.5">{l.phone}</div>
                  {l.email && <div className="text-xs text-white/40">{l.email}</div>}
                </CrmCell>
                <CrmCell>
                  <div className="font-medium">{l.partners?.full_name || "—"}</div>
                  <div className="text-xs text-white/40">{l.partners?.email}</div>
                </CrmCell>
                <CrmCell className="capitalize">{l.pillar}</CrmCell>
                <CrmCell>
                  <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                    <StageBadge stage={l.stage} />
                    <select
                      value={l.stage}
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
                  {l.expected_value != null ? Number(l.expected_value).toLocaleString() : "—"}
                </CrmCell>
                <CrmCell muted>
                  {l.protected_until
                    ? new Date(l.protected_until).toLocaleDateString()
                    : "—"}
                </CrmCell>
                <CrmCell muted>
                  {l.updated_at ? new Date(l.updated_at).toLocaleDateString() : "—"}
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>

          {selected && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setSelected(null)}>
              <div
                className="w-full max-w-md h-full bg-[#0c1220] border-l border-white/10 p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">{selected.org_name}</h2>
                  <button type="button" className="text-white/50 text-sm" onClick={() => setSelected(null)}>
                    Close
                  </button>
                </div>
                <div className="mt-3">
                  <StageBadge stage={selected.stage} />
                </div>
                <dl className="mt-6 space-y-3 text-sm">
                  <div>
                    <dt className="text-white/40 text-xs uppercase">Partner</dt>
                    <dd>{selected.partners?.full_name || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 text-xs uppercase">Contact</dt>
                    <dd>
                      {selected.contact_name}
                      <br />
                      {selected.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/40 text-xs uppercase">Requirement</dt>
                    <dd className="text-white/80 leading-relaxed whitespace-pre-wrap">
                      {selected.requirement}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </CrmShell>
      </main>
      <Footer />
    </>
  );
}
