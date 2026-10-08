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
  basis_amount: number;
  commission_pct: number;
  commission_amount: number;
  status: string;
  eligibility_date: string | null;
  paid_at: string | null;
  deals?: { customer_name: string } | null;
};

export default function PartnerCommissionsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [rows, setRows] = useState<Comm[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/commissions")
        .then((r) => r.json())
        .then((d) => setRows(d.commissions || []));
    }
  }, [status]);

  const pending = rows
    .filter((c) => ["PENDING", "ELIGIBLE", "APPROVED"].includes(c.status))
    .reduce((s, c) => s + Number(c.commission_amount), 0);
  const paid = rows
    .filter((c) => c.status === "PAID")
    .reduce((s, c) => s + Number(c.commission_amount), 0);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <Link href="/partners/dashboard" className="text-sm text-white/60">
            ← Dashboard
          </Link>
          <h1 className="mt-4 text-2xl font-bold">My commissions</h1>
          <p className="text-sm text-white/55">Paid only after client money clears with GetAxe.</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-white/50">Pending / eligible</p>
              <p className="text-xl font-bold">KSh {pending.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-white/50">Paid</p>
              <p className="text-xl font-bold">KSh {paid.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            {rows.map((c) => (
              <div key={c.id} className="rounded-lg border border-white/10 px-4 py-3 text-sm flex justify-between gap-2">
                <div>
                  <p className="font-medium">{c.deals?.customer_name || c.basis}</p>
                  <p className="text-xs text-white/45">
                    {(Number(c.commission_pct) * 100).toFixed(0)}% of {Number(c.basis_amount).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">KSh {Number(c.commission_amount).toLocaleString()}</p>
                  <p className="text-xs text-white/50">{c.status}</p>
                </div>
              </div>
            ))}
            {rows.length === 0 && <p className="text-white/50 text-sm">No commissions yet.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
