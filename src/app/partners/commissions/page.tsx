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

type Comm = {
  id: string;
  basis: string;
  basis_amount: number;
  commission_pct: number;
  commission_amount: number;
  status: string;
  eligibility_date: string | null;
  paid_at: string | null;
  deals?: { customer_name: string } | null;
};

export default function PartnerCommissionsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [rows, setRows] = useState<Comm[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/commissions")
        .then((r) => r.json())
        .then((d) => setRows(d.commissions || []));
    }
  }, [status]);

  const pending = rows
    .filter((c) => ["PENDING", "ELIGIBLE", "APPROVED"].includes(c.status))
    .reduce((s, c) => s + Number(c.commission_amount), 0);
  const paid = rows
    .filter((c) => c.status === "PAID")
    .reduce((s, c) => s + Number(c.commission_amount), 0);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="My commissions"
          subtitle="Paid only after client money has cleared with GetAxe."
          nav={[
            { href: "/partners/dashboard", label: "Leads" },
            { href: "/partners/onboarding", label: "Onboarding" },
            { href: "/partners/quotes", label: "Quotes" },
            { href: "/partners/commissions", label: "Commissions", active: true },
            { href: "/partners/training", label: "Training" },
          ]}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Entries" value={rows.length} />
            <CrmStat label="Pending (KES)" value={pending.toLocaleString()} />
            <CrmStat label="Paid (KES)" value={paid.toLocaleString()} />
          </div>

          <CrmMobileCards>
            {rows.length === 0 && (
              <p className="text-center text-sm text-white/40 py-10">No commissions yet.</p>
            )}
            {rows.map((c) => (
              <CrmCard
                key={c.id}
                title={c.deals?.customer_name || c.basis}
                badge={<StageBadge stage={c.status} />}
              >
                <CrmCardField label="Basis" value={Number(c.basis_amount).toLocaleString()} />
                <CrmCardField label="Rate" value={`${(Number(c.commission_pct) * 100).toFixed(0)}%`} />
                <CrmCardField
                  label="Commission"
                  value={
                    <span className="font-semibold text-[var(--color-accent)]">
                      KSh {Number(c.commission_amount).toLocaleString()}
                    </span>
                  }
                />
                <CrmCardField
                  label="Eligible"
                  value={
                    c.eligibility_date
                      ? new Date(c.eligibility_date).toLocaleDateString()
                      : "—"
                  }
                />
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable
            columns={[
              "Customer / basis",
              "Basis amount",
              "Rate",
              "Commission",
              "Status",
              "Eligible",
              "Paid",
            ]}
          >
            {rows.map((c) => (
              <CrmRow key={c.id}>
                <CrmCell>
                  <div className="font-semibold">{c.deals?.customer_name || c.basis}</div>
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
                <CrmCell muted>
                  {c.paid_at ? new Date(c.paid_at).toLocaleDateString() : "—"}
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
