"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
import { adminCrmNav } from "@/lib/admin-nav";
  CrmShell, CrmStat, CrmTable, CrmRow, CrmCell, StageBadge,
  CrmMobileCards, CrmCard, CrmCardField,
} from "@/components/crm/CrmShell";

type Ticket = {
  id: string;
  customer_name: string;
  contact_phone: string | null;
  subject: string;
  description: string | null;
  priority: string;
  status: string;
  category: string;
  created_at: string;
};

export default function AdminTicketsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/tickets");
    const d = await res.json();
    if (res.ok) setTickets(d.tickets || []);
  }
  useEffect(() => { if (session?.user?.role === "admin") load(); }, [session]);

  async function setStatus(id: string, st: string) {
    await fetch(`/api/tickets/${id}`, {
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
          title="CRM · Support tickets"
          subtitle="Level-1 support intake. Escalate to technical jobs when field work is needed."
          nav={adminCrmNav("tickets")}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Open" value={tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length} />
            <CrmStat label="Resolved" value={tickets.filter((t) => t.status === "RESOLVED" || t.status === "CLOSED").length} />
            <CrmStat label="Total" value={tickets.length} />
          </div>

          <CrmMobileCards>
            {tickets.map((t) => (
              <CrmCard key={t.id} title={t.subject} badge={<StageBadge stage={t.status} />}
                footer={
                  <select value={t.status} onChange={(e) => setStatus(t.id, e.target.value)}
                    className="w-full bg-[#0a101c] border border-white/10 rounded-lg px-3 py-2 text-sm">
                    {["OPEN", "IN_PROGRESS", "WAITING_CUSTOMER", "RESOLVED", "CLOSED"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                }
              >
                <CrmCardField label="Customer" value={t.customer_name} />
                <CrmCardField label="Priority" value={t.priority} />
                <CrmCardField label="Category" value={t.category} />
                <p className="text-xs text-white/50 line-clamp-2">{t.description}</p>
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable columns={["Subject", "Customer", "Priority", "Category", "Status", "Opened", "Update"]}>
            {tickets.map((t) => (
              <CrmRow key={t.id}>
                <CrmCell>
                  <div className="font-semibold">{t.subject}</div>
                  <div className="text-xs text-white/40 line-clamp-1">{t.description}</div>
                </CrmCell>
                <CrmCell>
                  <div>{t.customer_name}</div>
                  <div className="text-xs text-white/40">{t.contact_phone}</div>
                </CrmCell>
                <CrmCell className="capitalize">{t.priority}</CrmCell>
                <CrmCell className="capitalize">{t.category}</CrmCell>
                <CrmCell><StageBadge stage={t.status} /></CrmCell>
                <CrmCell muted>{new Date(t.created_at).toLocaleDateString()}</CrmCell>
                <CrmCell>
                  <select value={t.status} onChange={(e) => setStatus(t.id, e.target.value)}
                    className="bg-[#0a101c] border border-white/10 rounded-md text-xs px-2 py-1.5">
                    {["OPEN", "IN_PROGRESS", "WAITING_CUSTOMER", "RESOLVED", "CLOSED"].map((s) => (
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
