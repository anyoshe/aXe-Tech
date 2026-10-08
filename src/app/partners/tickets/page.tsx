"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  CrmShell, CrmStat, CrmTable, CrmRow, CrmCell, StageBadge,
  CrmMobileCards, CrmCard, CrmCardField,
} from "@/components/crm/CrmShell";

type Ticket = {
  id: string;
  customer_name: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  created_at: string;
};

export default function PartnerTicketsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    contact_phone: "",
    subject: "",
    description: "",
    priority: "medium",
    category: "general",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
  }, [status, router]);

  async function load() {
    const res = await fetch("/api/tickets");
    const d = await res.json();
    if (res.ok) setTickets(d.tickets || []);
  }
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShow(false);
    load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="Support tickets"
          subtitle="Log customer issues for GetAxe support. Do not become the full helpdesk yourself."
          nav={[
            { href: "/partners/dashboard", label: "Leads" },
            { href: "/partners/tickets", label: "Tickets", active: true },
            { href: "/partners/jobs", label: "Jobs" },
            { href: "/partners/quotes", label: "Quotes" },
            { href: "/partners/commissions", label: "Commissions" },
          ]}
          actions={
            <button type="button" onClick={() => setShow((v) => !v)}
              className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm">
              {show ? "Close" : "+ Ticket"}
            </button>
          }
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="My tickets" value={tickets.length} />
            <CrmStat label="Open" value={tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length} />
          </div>

          {show && (
            <form onSubmit={create} className="mb-8 space-y-3 rounded-2xl border border-white/10 bg-[#0f1624] p-5 max-w-xl">
              <input required placeholder="Customer name" value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                className="w-full rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input placeholder="Phone" value={form.contact_phone}
                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                className="w-full rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input required placeholder="Subject" value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <textarea placeholder="Description" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" rows={3} />
              <div className="grid grid-cols-2 gap-2">
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm">
                  {["low", "medium", "high", "urgent"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm">
                  {["software", "hardware", "network", "billing", "general"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm">
                Submit ticket
              </button>
            </form>
          )}

          <CrmMobileCards>
            {tickets.map((t) => (
              <CrmCard key={t.id} title={t.subject} badge={<StageBadge stage={t.status} />}>
                <CrmCardField label="Customer" value={t.customer_name} />
                <CrmCardField label="Priority" value={t.priority} />
                <CrmCardField label="Category" value={t.category} />
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable columns={["Subject", "Customer", "Priority", "Status", "Opened"]}>
            {tickets.map((t) => (
              <CrmRow key={t.id}>
                <CrmCell><div className="font-semibold">{t.subject}</div></CrmCell>
                <CrmCell>{t.customer_name}</CrmCell>
                <CrmCell className="capitalize">{t.priority}</CrmCell>
                <CrmCell><StageBadge stage={t.status} /></CrmCell>
                <CrmCell muted>{new Date(t.created_at).toLocaleDateString()}</CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
