"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { adminCrmNav } from "@/lib/admin-nav";
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

type Partner = { id: string; full_name: string };
type Deal = {
  id: string;
  customer_name: string;
  pillar: string;
  description?: string | null;
  invoice_amount: number;
  cost_amount: number;
  payment_status: string;
  payment_ref: string | null;
  paid_at?: string | null;
  created_at?: string;
  partners?: { full_name: string } | null;
};

export default function AdminDealsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    partner_id: "",
    pillar: "equip",
    invoice_amount: "",
    cost_amount: "",
    payment_status: "UNPAID",
    payment_ref: "",
    description: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const [d, p] = await Promise.all([fetch("/api/deals"), fetch("/api/partners")]);
    const dd = await d.json();
    const pp = await p.json();
    if (d.ok) setDeals(dd.deals || []);
    if (p.ok) setPartners(pp.partners || []);
  }
  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function createDeal(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        partner_id: form.partner_id || null,
        invoice_amount: Number(form.invoice_amount || 0),
        cost_amount: Number(form.cost_amount || 0),
      }),
    });
    setShowForm(false);
    setForm({
      customer_name: "",
      partner_id: "",
      pillar: "equip",
      invoice_amount: "",
      cost_amount: "",
      payment_status: "UNPAID",
      payment_ref: "",
      description: "",
    });
    load();
  }

  async function markPaid(id: string) {
    await fetch(`/api/deals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment_status: "PAID" }),
    });
    load();
  }

  const paidTotal = deals
    .filter((d) => d.payment_status === "PAID")
    .reduce((s, d) => s + Number(d.invoice_amount), 0);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="CRM · Deals & payments"
          subtitle="Commission is generated only when a deal is marked PAID (funds cleared)."
          nav={adminCrmNav("deals")}
          actions={
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm"
            >
              {showForm ? "Close form" : "+ New deal"}
            </button>
          }
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Deals" value={deals.length} />
            <CrmStat label="Paid volume (KES)" value={paidTotal.toLocaleString()} />
            <CrmStat
              label="Unpaid"
              value={deals.filter((d) => d.payment_status !== "PAID").length}
            />
          </div>

          {showForm && (
            <form
              onSubmit={createDeal}
              className="mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-[#0f1624] p-5"
            >
              <input
                required
                placeholder="Customer name"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
              />
              <select
                value={form.partner_id}
                onChange={(e) => setForm({ ...form, partner_id: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
              >
                <option value="">Partner (optional)</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name}
                  </option>
                ))}
              </select>
              <select
                value={form.pillar}
                onChange={(e) => setForm({ ...form, pillar: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
              >
                <option value="equip">EQUIP</option>
                <option value="connect">CONNECT</option>
                <option value="run">RUN</option>
                <option value="support">SUPPORT</option>
                <option value="mixed">Mixed</option>
              </select>
              <input
                placeholder="Invoice amount (KES)"
                value={form.invoice_amount}
                onChange={(e) => setForm({ ...form, invoice_amount: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
              />
              <input
                placeholder="Cost (for gross profit)"
                value={form.cost_amount}
                onChange={(e) => setForm({ ...form, cost_amount: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
              />
              <select
                value={form.payment_status}
                onChange={(e) => setForm({ ...form, payment_status: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm"
              >
                <option value="UNPAID">UNPAID</option>
                <option value="PAID">PAID</option>
                <option value="PARTIAL">PARTIAL</option>
              </select>
              <input
                placeholder="Payment reference"
                value={form.payment_ref}
                onChange={(e) => setForm({ ...form, payment_ref: e.target.value })}
                className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm sm:col-span-2"
              />
              <button
                type="submit"
                className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm"
              >
                Save deal
              </button>
            </form>
          )}

          <CrmMobileCards>
            {deals.length === 0 && (
              <p className="text-center text-sm text-white/40 py-10">No deals yet.</p>
            )}
            {deals.map((d) => {
              const gp = Number(d.invoice_amount) - Number(d.cost_amount);
              return (
                <CrmCard
                  key={d.id}
                  title={d.customer_name}
                  badge={<StageBadge stage={d.payment_status} />}
                  footer={
                    d.payment_status !== "PAID" ? (
                      <button
                        type="button"
                        onClick={() => markPaid(d.id)}
                        className="w-full rounded-lg bg-emerald-600/90 font-semibold py-2.5 text-sm"
                      >
                        Mark PAID
                      </button>
                    ) : null
                  }
                >
                  <CrmCardField label="Partner" value={d.partners?.full_name || "—"} />
                  <CrmCardField label="Pillar" value={<span className="capitalize">{d.pillar}</span>} />
                  <CrmCardField label="Invoice" value={Number(d.invoice_amount).toLocaleString()} />
                  <CrmCardField label="Cost" value={Number(d.cost_amount).toLocaleString()} />
                  <CrmCardField label="Gross profit" value={<span className="text-emerald-300">{gp.toLocaleString()}</span>} />
                  <CrmCardField label="Reference" value={d.payment_ref || "—"} />
                </CrmCard>
              );
            })}
          </CrmMobileCards>

          <CrmTable
            columns={[
              "Customer",
              "Partner",
              "Pillar",
              "Invoice",
              "Cost",
              "Gross profit",
              "Payment",
              "Reference",
              "Actions",
            ]}
            empty="No deals yet. Create one when a sale is confirmed."
          >
            {deals.map((d) => {
              const gp = Number(d.invoice_amount) - Number(d.cost_amount);
              return (
                <CrmRow key={d.id}>
                  <CrmCell>
                    <div className="font-semibold">{d.customer_name}</div>
                    {d.description && (
                      <div className="text-xs text-white/40 mt-1 line-clamp-2">{d.description}</div>
                    )}
                  </CrmCell>
                  <CrmCell muted>{d.partners?.full_name || "—"}</CrmCell>
                  <CrmCell className="capitalize">{d.pillar}</CrmCell>
                  <CrmCell className="tabular-nums font-medium">
                    {Number(d.invoice_amount).toLocaleString()}
                  </CrmCell>
                  <CrmCell className="tabular-nums" muted>
                    {Number(d.cost_amount).toLocaleString()}
                  </CrmCell>
                  <CrmCell className="tabular-nums text-emerald-300/90">
                    {gp.toLocaleString()}
                  </CrmCell>
                  <CrmCell>
                    <StageBadge stage={d.payment_status} />
                    {d.paid_at && (
                      <div className="text-[10px] text-white/35 mt-1">
                        {new Date(d.paid_at).toLocaleDateString()}
                      </div>
                    )}
                  </CrmCell>
                  <CrmCell muted className="text-xs">
                    {d.payment_ref || "—"}
                  </CrmCell>
                  <CrmCell>
                    {d.payment_status !== "PAID" && (
                      <button
                        type="button"
                        onClick={() => markPaid(d.id)}
                        className="rounded-md bg-emerald-600/90 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold"
                      >
                        Mark PAID
                      </button>
                    )}
                  </CrmCell>
                </CrmRow>
              );
            })}
          </CrmTable>
        </CrmShell>
      </main>
    </>
  );
}
