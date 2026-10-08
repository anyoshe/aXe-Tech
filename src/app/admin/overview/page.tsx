"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CrmShell, CrmStat, StageBadge } from "@/components/crm/CrmShell";
import { adminCrmNav } from "@/lib/admin-nav";

type Stats = {
  partners_total: number;
  partners_active: number;
  partners_applied: number;
  leads_total: number;
  leads_open: number;
  pipeline_value: number;
  quotes_pending: number;
  deals_unpaid: number;
  paid_revenue: number;
  commissions_due: number;
  tickets_open: number;
  jobs_open: number;
  mrr: number;
};

const links = [
  { href: "/admin/leads", label: "Leads", desc: "Pipeline" },
  { href: "/admin/partners", label: "Partners", desc: "Approvals" },
  { href: "/admin/quotes", label: "Quotes", desc: "Pricing approval" },
  { href: "/admin/deals", label: "Deals", desc: "Payments" },
  { href: "/admin/commissions", label: "Commissions", desc: "Payouts" },
  { href: "/admin/subscriptions", label: "Subs", desc: "MRR" },
  { href: "/admin/jobs", label: "Jobs", desc: "Field work" },
  { href: "/admin/tickets", label: "Tickets", desc: "Support" },
  { href: "/admin/campaigns", label: "Campaigns", desc: "Attribution" },
  { href: "/admin/warranties", label: "Warranty", desc: "Serials" },
];

export default function AdminOverviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/partners/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role !== "admin") return;
    fetch("/api/crm/overview")
      .then((r) => r.json())
      .then((d) => {
        if (d.stats) setStats(d.stats);
        if (d.error) setError(d.error);
      })
      .catch(() => setError("Could not load overview"));
  }, [session]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="GetAxe CRM · Overview"
          subtitle="Pilot control panel — partners, pipeline, money, delivery."
          nav={adminCrmNav("overview")}
        >
          {error && (
            <p className="mb-4 text-sm text-amber-300/90">
              Some tables may be missing. Run SQL v1–v4 in Supabase. ({error})
            </p>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <CrmStat label="Active partners" value={stats?.partners_active ?? "—"} hint={`${stats?.partners_applied ?? 0} applied`} />
            <CrmStat label="Open leads" value={stats?.leads_open ?? "—"} hint={`${stats?.leads_total ?? 0} total`} />
            <CrmStat label="Pipeline (KES)" value={stats ? stats.pipeline_value.toLocaleString() : "—"} />
            <CrmStat label="Quotes pending" value={stats?.quotes_pending ?? "—"} />
            <CrmStat label="Paid revenue" value={stats ? stats.paid_revenue.toLocaleString() : "—"} />
            <CrmStat label="Commissions due" value={stats ? stats.commissions_due.toLocaleString() : "—"} />
            <CrmStat label="MRR" value={stats ? stats.mrr.toLocaleString() : "—"} />
            <CrmStat label="Open tickets / jobs" value={stats ? `${stats.tickets_open} / ${stats.jobs_open}` : "—"} />
          </div>

          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Modules</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl border border-white/10 bg-[#0f1624] p-4 hover:border-[var(--color-accent)]/40 transition"
              >
                <p className="font-semibold text-white">{l.label}</p>
                <p className="text-xs text-white/45 mt-1">{l.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-[#0f1624] p-5 text-sm text-white/60">
            <p className="font-semibold text-white">Pilot operating rhythm</p>
            <ol className="mt-3 list-decimal pl-5 space-y-1">
              <li>Approve new partners → set TRAINING / CERTIFIED / ACTIVE</li>
              <li>Clear pending quotes with setup + monthly bands</li>
              <li>Mark deals PAID when funds clear → commissions appear</li>
              <li>Pay commissions (APPROVED → PAID) to partner M-Pesa</li>
              <li>Record subscription payments monthly for residual commissions</li>
            </ol>
          </div>
        </CrmShell>
      </main>
    </>
  );
}
