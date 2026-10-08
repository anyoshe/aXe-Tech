"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

type Comm = {
  id: string;
  basis: string;
  basis_amount: number;
  commission_amount: number;
  commission_pct: number;
  status: string;
  eligibility_date?: string | null;
  paid_at?: string | null;
  partners?: { full_name: string; mpesa_number: string; email?: string } | null;
  deals?: { customer_name: string; invoice_amount?: number } | null;
};

export default function AdminCommissionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rows, setRows] = useState<Comm[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/commissions");
    const d = await res.json();
    if (res.ok) setRows(d.commissions || []);
  }
  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function setStatus(id: string, st: string) {
    await fetch("/api/commissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: st }),
    });
    load();
  }

  const eligible = rows
    .filter((c) => ["ELIGIBLE", "APPROVED"].includes(c.status))
    .reduce((s, c) => s + Number(c.commission_amount), 0);
  const paid = rows
    .filter((c) => c.status === "PAID")
    .reduce((s, c) => s + Number(c.commission_amount), 0);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Commission ledger"
          subtitle="Pay partners only after client funds have cleared. Use M-Pesa number on partner profile."
          nav={[
            { href: "/admin/leads", label: "Leads" },
            { href: "/admin/partners", label: "Partners" },
            { href: "/admin/quotes", label: "Quotes" },
            { href: "/admin/deals", label: "Deals" },
            { href: "/admin/commissions", label: "Commissions", active: true },
          ]}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Entries" value={rows.length} />
            <CrmStat label="To pay (KES)" value={eligible.toLocaleString()} />
            <CrmStat label="Paid (KES)" value={paid.toLocaleString()} />
          </div>

          <CrmTable
            columns={[
              "Partner",
              "Customer / basis",
              "Basis amount",
              "Rate",
              "Commission",
              "Status",
              "Eligible",
              "Update status",
            ]}
            empty="No commissions yet. Mark a deal PAID to generate entries."
          >
            {rows.map((c) => (
              <CrmRow key={c.id}>
                <CrmCell>
                  <div className="font-semibold">{c.partners?.full_name || "—"}</div>
                  <div className="text-xs text-white/40 mt-0.5">{c.partners?.email}</div>
                  <div className="text-xs text-white/35 mt-0.5">
                    M-Pesa: {c.partners?.mpesa_number || "—"}
                  </div>
                </CrmCell>
                <CrmCell>
                  <div>{c.deals?.customer_name || c.basis}</div>
                  <div className="text-xs text-white/40 capitalize mt-0.5">{c.basis}</div>
                </CrmCell>
                <CrmCell className="tabular-nums" muted>
                  {Number(c.basis_amount).toLocaleString()}
                </CrmCell>
                <CrmCell className="tabular-nums">
                  {(Number(c.commission_pct) * 100).toFixed(0)}%
                </CrmCell>
                <CrmCell className="tabular-nums font-semibold text-[var(--color-accent)]">
                  {Number(c.commission_amount).toLocaleString()}
                </CrmCell>
                <CrmCell>
                  <StageBadge stage={c.status} />
                </CrmCell>
                <CrmCell muted>
                  {c.eligibility_date
                    ? new Date(c.eligibility_date).toLocaleDateString()
                    : "—"}
                </CrmCell>
                <CrmCell>
                  <select
                    value={c.status}
                    onChange={(e) => setStatus(c.id, e.target.value)}
                    className="bg-[#0a101c] border border-white/10 rounded-md text-xs px-2 py-1.5"
                  >
                    {["PENDING", "ELIGIBLE", "APPROVED", "PAID", "REVERSED", "CLAWED_BACK"].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
      <Footer />
    </>
  );
}
