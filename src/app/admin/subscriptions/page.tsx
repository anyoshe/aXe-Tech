"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { adminCrmNav } from "@/lib/admin-nav";
import {
  CrmShell, CrmStat, CrmTable, CrmRow, CrmCell, StageBadge,
  CrmMobileCards, CrmCard, CrmCardField,
} from "@/components/crm/CrmShell";

type Sub = {
  id: string;
  customer_name: string;
  product_name: string;
  monthly_amount: number;
  status: string;
  start_date: string;
  partner_id: string | null;
  partners?: { full_name: string; email: string } | null;
};

type Partner = { id: string; full_name: string };

export default function AdminSubscriptionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subs, setSubs] = useState<Sub[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    product_name: "GetAxe Software",
    monthly_amount: "",
    partner_id: "",
    start_date: "",
  });
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const [s, p] = await Promise.all([fetch("/api/subscriptions"), fetch("/api/partners")]);
    const sd = await s.json();
    const pd = await p.json();
    if (s.ok) setSubs(sd.subscriptions || []);
    if (p.ok) setPartners(pd.partners || []);
  }
  useEffect(() => { if (session?.user?.role === "admin") load(); }, [session]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        monthly_amount: Number(form.monthly_amount || 0),
        partner_id: form.partner_id || null,
        start_date: form.start_date || undefined,
      }),
    });
    setShow(false);
    load();
  }

  async function recordPayment(id: string) {
    setMsg(null);
    const res = await fetch("/api/subscriptions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "record_payment",
        subscription_id: id,
        period_label: new Date().toISOString().slice(0, 7),
      }),
    });
    const d = await res.json();
    if (!res.ok) setMsg(d.error || "Failed");
    else setMsg("Payment recorded — commission created if partner attributed.");
    load();
  }

  const mrr = subs
    .filter((s) => s.status === "ACTIVE")
    .reduce((a, s) => a + Number(s.monthly_amount), 0);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Subscriptions"
          subtitle="Recurring software. Record monthly payment → partner residual commission."
          nav={adminCrmNav("subscriptions")}
          actions={
            <button type="button" onClick={() => setShow((v) => !v)}
              className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm">
              {show ? "Close" : "+ Subscription"}
            </button>
          }
        >
          {msg && <p className="mb-4 text-sm text-[var(--color-accent)]">{msg}</p>}
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Active subs" value={subs.filter((s) => s.status === "ACTIVE").length} />
            <CrmStat label="MRR (KES)" value={mrr.toLocaleString()} />
          </div>

          {show && (
            <form onSubmit={create} className="mb-8 grid sm:grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0f1624] p-5">
              <input required placeholder="Customer name" value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input placeholder="Product" value={form.product_name}
                onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input placeholder="Monthly amount" value={form.monthly_amount}
                onChange={(e) => setForm({ ...form, monthly_amount: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <select value={form.partner_id} onChange={(e) => setForm({ ...form, partner_id: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm">
                <option value="">Attributed partner</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>{p.full_name}</option>
                ))}
              </select>
              <input type="date" value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <button type="submit" className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm">
                Save subscription
              </button>
            </form>
          )}

          <CrmMobileCards>
            {subs.map((s) => (
              <CrmCard key={s.id} title={s.customer_name} badge={<StageBadge stage={s.status} />}
                footer={
                  s.status === "ACTIVE" ? (
                    <button type="button" onClick={() => recordPayment(s.id)}
                      className="w-full rounded-lg bg-emerald-600/90 font-semibold py-2.5 text-sm">
                      Record month paid
                    </button>
                  ) : null
                }
              >
                <CrmCardField label="Product" value={s.product_name} />
                <CrmCardField label="Monthly" value={Number(s.monthly_amount).toLocaleString()} />
                <CrmCardField label="Partner" value={s.partners?.full_name || "—"} />
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable columns={["Customer", "Product", "Monthly", "Partner", "Status", "Start", "Actions"]}>
            {subs.map((s) => (
              <CrmRow key={s.id}>
                <CrmCell><div className="font-semibold">{s.customer_name}</div></CrmCell>
                <CrmCell>{s.product_name}</CrmCell>
                <CrmCell className="tabular-nums">{Number(s.monthly_amount).toLocaleString()}</CrmCell>
                <CrmCell muted>{s.partners?.full_name || "—"}</CrmCell>
                <CrmCell><StageBadge stage={s.status} /></CrmCell>
                <CrmCell muted>{s.start_date}</CrmCell>
                <CrmCell>
                  {s.status === "ACTIVE" && (
                    <button type="button" onClick={() => recordPayment(s.id)}
                      className="rounded-md bg-emerald-600/90 px-3 py-1.5 text-xs font-semibold">
                      Record paid
                    </button>
                  )}
                </CrmCell>
              </CrmRow>
            ))}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
