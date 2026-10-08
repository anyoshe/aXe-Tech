"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  CrmShell, CrmStat, CrmTable, CrmRow, CrmCell, StageBadge,
  CrmMobileCards, CrmCard, CrmCardField,
} from "@/components/crm/CrmShell";

type Job = {
  id: string;
  title: string;
  job_type: string;
  status: string;
  site_address: string | null;
  county: string | null;
  scheduled_at: string | null;
  notes: string | null;
  customer_signoff: boolean;
};

export default function PartnerJobsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
  }, [status, router]);

  async function load() {
    const res = await fetch("/api/jobs");
    const d = await res.json();
    if (res.ok) setJobs(d.jobs || []);
  }
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  async function update(id: string, body: Record<string, unknown>) {
    await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="My jobs"
          subtitle="Jobs linked to you as sales owner or assigned technician."
          nav={[
            { href: "/partners/dashboard", label: "Leads" },
            { href: "/partners/jobs", label: "Jobs", active: true },
            { href: "/partners/tickets", label: "Tickets" },
            { href: "/partners/quotes", label: "Quotes" },
            { href: "/partners/commissions", label: "Commissions" },
          ]}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Assigned" value={jobs.length} />
            <CrmStat label="Open" value={jobs.filter((j) => j.status !== "COMPLETED" && j.status !== "CANCELLED").length} />
          </div>

          <CrmMobileCards>
            {jobs.map((j) => (
              <CrmCard key={j.id} title={j.title} badge={<StageBadge stage={j.status} />}
                footer={
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => update(j.id, { status: "IN_PROGRESS" })}
                      className="rounded-lg border border-white/15 py-2 text-sm">Start / in progress</button>
                    <button type="button" onClick={() => update(j.id, { status: "COMPLETED", customer_signoff: true })}
                      className="rounded-lg bg-emerald-600/90 font-semibold py-2 text-sm">Complete + sign-off</button>
                  </div>
                }
              >
                <CrmCardField label="Type" value={j.job_type} />
                <CrmCardField label="Site" value={j.site_address || "—"} />
                <CrmCardField label="When" value={j.scheduled_at ? new Date(j.scheduled_at).toLocaleString() : "—"} />
              </CrmCard>
            ))}
            {jobs.length === 0 && <p className="text-center text-white/40 text-sm py-8">No jobs assigned yet.</p>}
          </CrmMobileCards>

          <CrmTable columns={["Title", "Type", "Site", "Scheduled", "Status", "Actions"]}>
            {jobs.map((j) => (
              <CrmRow key={j.id}>
                <CrmCell><div className="font-semibold">{j.title}</div></CrmCell>
                <CrmCell className="capitalize">{j.job_type}</CrmCell>
                <CrmCell muted>{j.site_address || "—"}</CrmCell>
                <CrmCell muted>{j.scheduled_at ? new Date(j.scheduled_at).toLocaleString() : "—"}</CrmCell>
                <CrmCell><StageBadge stage={j.status} /></CrmCell>
                <CrmCell>
                  <div className="flex flex-col gap-1">
                    <button type="button" onClick={() => update(j.id, { status: "IN_PROGRESS" })} className="text-xs text-white/70 underline">In progress</button>
                    <button type="button" onClick={() => update(j.id, { status: "COMPLETED", customer_signoff: true })} className="text-xs text-emerald-300 underline">Complete</button>
                  </div>
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
