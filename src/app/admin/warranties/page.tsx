"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  CrmShell, CrmStat, CrmTable, CrmRow, CrmCell, StageBadge,
  CrmMobileCards, CrmCard, CrmCardField,
} from "@/components/crm/CrmShell";

type W = {
  id: string;
  customer_name: string;
  product_name: string;
  serial_number: string | null;
  supplier: string | null;
  purchase_date: string | null;
  warranty_end: string | null;
  warranty_months: number;
  status: string;
};

export default function AdminWarrantiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rows, setRows] = useState<W[]>([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    product_name: "",
    serial_number: "",
    supplier: "",
    purchase_date: "",
    warranty_months: "12",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/warranties");
    const d = await res.json();
    if (res.ok) setRows(d.warranties || []);
  }
  useEffect(() => { if (session?.user?.role === "admin") load(); }, [session]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/warranties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, warranty_months: Number(form.warranty_months) }),
    });
    setShow(false);
    load();
  }

  async function setStatus(id: string, st: string) {
    await fetch("/api/warranties", {
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
          title="CRM · Warranties"
          subtitle="Track serials, supplier warranty period, and claim status."
          nav={[
            { href: "/admin/deals", label: "Deals" },
            { href: "/admin/warranties", label: "Warranty", active: true },
            { href: "/admin/tickets", label: "Tickets" },
            { href: "/admin/jobs", label: "Jobs" },
            { href: "/admin/leads", label: "Leads" },
          ]}
          actions={
            <button type="button" onClick={() => setShow((v) => !v)}
              className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm">
              {show ? "Close" : "+ Warranty"}
            </button>
          }
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Active" value={rows.filter((r) => r.status === "ACTIVE").length} />
            <CrmStat label="Total" value={rows.length} />
          </div>

          {show && (
            <form onSubmit={create} className="mb-8 grid sm:grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0f1624] p-5">
              <input required placeholder="Customer" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input required placeholder="Product" value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input placeholder="Serial number" value={form.serial_number} onChange={(e) => setForm({ ...form, serial_number: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input placeholder="Supplier" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input type="date" value={form.purchase_date} onChange={(e) => setForm({ ...form, purchase_date: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <input placeholder="Months" value={form.warranty_months} onChange={(e) => setForm({ ...form, warranty_months: e.target.value })} className="rounded-lg bg-[#0a101c] border border-white/10 px-3 py-2.5 text-sm" />
              <button type="submit" className="sm:col-span-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm">Save</button>
            </form>
          )}

          <CrmMobileCards>
            {rows.map((r) => (
              <CrmCard key={r.id} title={r.product_name} badge={<StageBadge stage={r.status} />}>
                <CrmCardField label="Customer" value={r.customer_name} />
                <CrmCardField label="Serial" value={r.serial_number || "—"} />
                <CrmCardField label="Ends" value={r.warranty_end || "—"} />
              </CrmCard>
            ))}
          </CrmMobileCards>

          <CrmTable columns={["Product", "Customer", "Serial", "Supplier", "Ends", "Status", "Update"]}>
            {rows.map((r) => (
              <CrmRow key={r.id}>
                <CrmCell><div className="font-semibold">{r.product_name}</div></CrmCell>
                <CrmCell>{r.customer_name}</CrmCell>
                <CrmCell className="font-mono text-xs">{r.serial_number || "—"}</CrmCell>
                <CrmCell muted>{r.supplier || "—"}</CrmCell>
                <CrmCell muted>{r.warranty_end || "—"}</CrmCell>
                <CrmCell><StageBadge stage={r.status} /></CrmCell>
                <CrmCell>
                  <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}
                    className="bg-[#0a101c] border border-white/10 rounded-md text-xs px-2 py-1.5">
                    {["ACTIVE", "EXPIRED", "CLAIMED", "VOID"].map((s) => (
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
