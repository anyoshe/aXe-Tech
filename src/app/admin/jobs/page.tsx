"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
import { adminCrmNav } from "@/lib/admin-nav";
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

type Job = {
  id: string;
  title: string;
  job_type: string;
  status: string;
  site_address: string | null;
  county: string | null;
  scheduled_at: string | null;
  technician_id: string | null;
  notes: string | null;
  completion_notes: string | null;
  serial_numbers: string | null;
  customer_signoff: boolean;
};

type Partner = { id: string; full_name: string; role?: string; specialty?: string };

export default function AdminJobsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    job_type: "install",
    site_address: "",
    county: "",
    technician_id: "",
    notes: "",
    scheduled_at: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const [j, p] = await Promise.all([fetch("/api/jobs"), fetch("/api/partners")]);
    const jd = await j.json();
    const pd = await p.json();
    if (j.ok) setJobs(jd.jobs || []);
    if (p.ok) setPartners(pd.partners || []);
  }
  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        technician_id: form.technician_id || null,
        scheduled_at: form.scheduled_at || null,
      }),
    });
    setShow(false);
    load();
  }

  async function setStatus(id: string, st: string) {
    await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: st }),
    });
    load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Technical jobs"
          subtitle="Surveys, installs, networking — assign technicians and track completion + sign-off."
          nav={adminCrmNav("jobs")}
          actions={
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm"
            >
              {show ? "Close" : "+ Job"}
            </button>
          }
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Jobs" value={jobs.length} />
            <CrmStat label="Open / assigned" value={jobs.filter((j) => ["OPEN", "ASSIGNED", "IN_PROGRESS"].includes(j.status)).length} />
            <CrmStat label="Completed" value={jobs.filter((j) => j.status === "COMPLETED").length} />
          </div>

          {show && (
            <form onSubmit={create} className="mb-8 grid sm:grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0f1624] p-5">
              <input required placeholder="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm sm:col-span-2" />
              <select value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm">
                {["survey", "install", "network", "repair", "maintenance", "other"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <select value={form.technician_id} onChange={(e) => setForm({ ...form, technician_id: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm">
                <option value="">Technician (optional)</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>{p.full_name}</option>
                ))}
              </select>
              <input placeholder="Site address" value={form.site_address} onChange={(e) => setForm({ ...form, site_address: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input placeholder="County" value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm sm:col-span-2" />
              <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm sm:col-span-2" rows={2} />
              <button type="submit" className="sm:col-span-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm">Create job</button>
            </form>
          )}

          <CrmMobileCards>
            {jobs.map((j) => (
              <CrmCard key={j.id} title={j.title} badge={<StageBadge stage={j.status} />}
                footer={
                  <select value={j.status} onChange={(e) => setStatus(j.id, e.target.value)} className="w-full bg-[#0a101c] border border-white/10 rounded-lg px-3 py-2 text-sm">
                    {["OPEN", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                }
              >
                <CrmCardField label="Type" value={j.job_type} />
                <CrmCardField label="Site" value={j.site_address || "—"} />
                <CrmCardField label="County" value={j.county || "—"} />
                <CrmCardField label="Sign-off" value={j.customer_signoff ? "Yes" : "No"} />
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable columns={["Title", "Type", "Site", "Scheduled", "Status", "Sign-off", "Update"]}>
            {jobs.map((j) => (
              <CrmRow key={j.id}>
                <CrmCell><div className="font-semibold">{j.title}</div></CrmCell>
                <CrmCell className="capitalize">{j.job_type}</CrmCell>
                <CrmCell muted>{j.site_address || "—"}{j.county ? ` · ${j.county}` : ""}</CrmCell>
                <CrmCell muted>{j.scheduled_at ? new Date(j.scheduled_at).toLocaleString() : "—"}</CrmCell>
                <CrmCell><StageBadge stage={j.status} /></CrmCell>
                <CrmCell>{j.customer_signoff ? "Yes" : "No"}</CrmCell>
                <CrmCell>
                  <select value={j.status} onChange={(e) => setStatus(j.id, e.target.value)} className="bg-[#0a101c] border border-white/10 rounded-md text-xs px-2 py-1.5">
                    {["OPEN", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
