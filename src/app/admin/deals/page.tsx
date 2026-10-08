"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Partner = { id: string; full_name: string };
type Deal = {
  id: string;
  customer_name: string;
  pillar: string;
  invoice_amount: number;
  cost_amount: number;
  payment_status: string;
  payment_ref: string | null;
  partners?: { full_name: string } | null;
};

export default function AdminDealsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
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

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-bold">Admin · Deals & payments</h1>
            <Link href="/admin/commissions" className="text-sm text-[var(--color-accent)]">
              Commissions →
            </Link>
          </div>
          <p className="text-sm text-white/55 mt-1">
            Commission is created only when status is PAID (money cleared).
          </p>

          <form onSubmit={createDeal} className="mt-8 grid sm:grid-cols-2 gap-3 rounded-2xl border border-white/10 p-5 bg-white/5">
            <input
              required
              placeholder="Customer name"
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
            />
            <select
              value={form.partner_id}
              onChange={(e) => setForm({ ...form, partner_id: e.target.value })}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
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
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
            >
              <option value="equip">EQUIP</option>
              <option value="connect">CONNECT</option>
              <option value="run">RUN</option>
              <option value="support">SUPPORT</option>
              <option value="mixed">Mixed</option>
            </select>
            <select
              value={form.payment_status}
              onChange={(e) => setForm({ ...form, payment_status: e.target.value })}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
            >
              <option value="UNPAID">UNPAID</option>
              <option value="PAID">PAID</option>
              <option value="PARTIAL">PARTIAL</option>
            </select>
            <input
              placeholder="Invoice amount"
              value={form.invoice_amount}
              onChange={(e) => setForm({ ...form, invoice_amount: e.target.value })}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
            />
            <input
              placeholder="Cost (for GP / hardware commission)"
              value={form.cost_amount}
              onChange={(e) => setForm({ ...form, cost_amount: e.target.value })}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm"
            />
            <input
              placeholder="Payment ref (M-Pesa/bank)"
              value={form.payment_ref}
              onChange={(e) => setForm({ ...form, payment_ref: e.target.value })}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm sm:col-span-2"
            />
            <button
              type="submit"
              className="sm:col-span-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2 text-sm"
            >
              Create deal
            </button>
          </form>

          <div className="mt-8 space-y-2">
            {deals.map((d) => (
              <div key={d.id} className="rounded-xl border border-white/10 p-4 flex flex-wrap justify-between gap-2 text-sm">
                <div>
                  <p className="font-medium">{d.customer_name}</p>
                  <p className="text-xs text-white/50">
                    {d.partners?.full_name || "No partner"} · {d.pillar} · inv{" "}
                    {Number(d.invoice_amount).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{d.payment_status}</span>
                  {d.payment_status !== "PAID" && (
                    <button
                      type="button"
                      onClick={() => markPaid(d.id)}
                      className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold"
                    >
                      Mark PAID
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
