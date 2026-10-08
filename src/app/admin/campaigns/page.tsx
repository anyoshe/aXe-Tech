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

type Campaign = {
  id: string;
  name: string;
  code: string;
  channel: string;
  status: string;
  notes: string | null;
  created_at: string;
};

type Partner = { id: string; full_name: string };

export default function AdminCampaignsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    channel: "whatsapp",
    marketer_partner_id: "",
    notes: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const [c, p] = await Promise.all([fetch("/api/campaigns"), fetch("/api/partners")]);
    const cd = await c.json();
    const pd = await p.json();
    if (c.ok) setCampaigns(cd.campaigns || []);
    if (p.ok) setPartners(pd.partners || []);
  }
  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        marketer_partner_id: form.marketer_partner_id || null,
      }),
    });
    setShow(false);
    load();
  }

  async function setStatus(id: string, st: string) {
    await fetch("/api/campaigns", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: st }),
    });
    load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Marketing campaigns"
          subtitle="Create tracking codes. Partners can attach campaign_code / referral_code on leads."
          nav={adminCrmNav("campaigns")}
          actions={
            <button type="button" onClick={() => setShow((v) => !v)} className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm">
              {show ? "Close" : "+ Campaign"}
            </button>
          }
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Campaigns" value={campaigns.length} />
            <CrmStat label="Active" value={campaigns.filter((c) => c.status === "ACTIVE").length} />
          </div>

          {show && (
            <form onSubmit={create} className="mb-8 grid sm:grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0f1624] p-5">
              <input required placeholder="Campaign name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input required placeholder="Code e.g. SCHOOL2026" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm font-mono" />
              <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm">
                {["facebook", "instagram", "tiktok", "whatsapp", "google", "referral", "other"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select value={form.marketer_partner_id} onChange={(e) => setForm({ ...form, marketer_partner_id: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm">
                <option value="">Marketer partner (optional)</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>{p.full_name}</option>
                ))}
              </select>
              <button type="submit" className="sm:col-span-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm">Create</button>
            </form>
          )}

          <CrmMobileCards>
            {campaigns.map((c) => (
              <CrmCard key={c.id} title={c.name} badge={<StageBadge stage={c.status} />}
                footer={
                  <select value={c.status} onChange={(e) => setStatus(c.id, e.target.value)} className="w-full bg-[#0a101c] border border-white/10 rounded-lg px-3 py-2 text-sm">
                    {["ACTIVE", "PAUSED", "ENDED"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                }
              >
                <CrmCardField label="Code" value={<span className="font-mono">{c.code}</span>} />
                <CrmCardField label="Channel" value={c.channel} />
                <CrmCardField label="Link" value={`?campaign=${c.code}`} />
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable columns={["Name", "Code", "Channel", "Status", "Created", "Update"]}>
            {campaigns.map((c) => (
              <CrmRow key={c.id}>
                <CrmCell><div className="font-semibold">{c.name}</div></CrmCell>
                <CrmCell className="font-mono text-[var(--color-accent)]">{c.code}</CrmCell>
                <CrmCell className="capitalize">{c.channel}</CrmCell>
                <CrmCell><StageBadge stage={c.status} /></CrmCell>
                <CrmCell muted>{new Date(c.created_at).toLocaleDateString()}</CrmCell>
                <CrmCell>
                  <select value={c.status} onChange={(e) => setStatus(c.id, e.target.value)} className="bg-[#0a101c] border border-white/10 rounded-md text-xs px-2 py-1.5">
                    {["ACTIVE", "PAUSED", "ENDED"].map((s) => (
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
