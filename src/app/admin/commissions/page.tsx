"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Comm = {
  id: string;
  basis: string;
  commission_amount: number;
  commission_pct: number;
  status: string;
  partners?: { full_name: string; mpesa_number: string } | null;
  deals?: { customer_name: string } | null;
};

export default function AdminCommissionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rows, setRows] = useState<Comm[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/commissions");
    const d = await res.json();
    if (res.ok) setRows(d.commissions || []);
  }
  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function setStatus(id: string, st: string) {
    await fetch("/api/commissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: st }),
    });
    load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-bold">Admin · Commission ledger</h1>
            <Link href="/admin/deals" className="text-sm text-[var(--color-accent)]">
              ← Deals
            </Link>
          </div>
          <div className="mt-8 space-y-2">
            {rows.map((c) => (
              <div key={c.id} className="rounded-xl border border-white/10 p-4 flex flex-wrap justify-between gap-3 text-sm">
                <div>
                  <p className="font-medium">
                    {c.partners?.full_name} · {c.deals?.customer_name || c.basis}
                  </p>
                  <p className="text-xs text-white/50">
                    M-Pesa: {c.partners?.mpesa_number || "—"} · {(Number(c.commission_pct) * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">KSh {Number(c.commission_amount).toLocaleString()}</span>
                  <select
                    value={c.status}
                    onChange={(e) => setStatus(c.id, e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-lg text-xs px-2 py-1"
                  >
                    {["PENDING", "ELIGIBLE", "APPROVED", "PAID", "REVERSED", "CLAWED_BACK"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            {rows.length === 0 && <p className="text-white/50">No commissions yet. Mark a deal PAID first.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
