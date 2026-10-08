"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PARTNER_STATUSES } from "@/lib/partner-constants";

type Partner = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  county: string | null;
  specialty: string;
  status: string;
  occupation: string | null;
  created_at: string;
  admin_notes: string | null;
};

export default function AdminPartnersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/partners/dashboard");
    }
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/partners");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed");
      return;
    }
    setPartners(data.partners || []);
  }

  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function setStatus(id: string, st: string) {
    await fetch("/api/partners", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: st }),
    });
    await load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Admin · Partners</h1>
              <p className="text-sm text-white/55">Approve applications and set status.</p>
            </div>
            <div className="flex gap-2 text-sm">
              <Link href="/admin/leads" className="rounded-lg border border-white/20 px-3 py-2">
                All leads
              </Link>
              <Link href="/admin/products" className="rounded-lg border border-white/20 px-3 py-2">
                Products
              </Link>
            </div>
          </div>
          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
          <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/40 text-xs uppercase text-white/50">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">Specialty</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Applied</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="px-3 py-3">
                      <div className="font-medium">{p.full_name}</div>
                      <div className="text-xs text-white/45">{p.occupation || p.county}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div>{p.email}</div>
                      <div className="text-xs text-white/45">{p.phone}</div>
                    </td>
                    <td className="px-3 py-3 capitalize">{p.specialty}</td>
                    <td className="px-3 py-3">
                      <select
                        value={p.status}
                        onChange={(e) => setStatus(p.id, e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-xs"
                      >
                        {PARTNER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3 text-xs text-white/50">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {partners.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-white/50">
                      No applications yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-white/40">
            Partners can log in from APPROVED onward. Lead registration requires CERTIFIED or ACTIVE.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
