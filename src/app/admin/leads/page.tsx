"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LEAD_STAGES } from "@/lib/partner-constants";

type Lead = {
  id: string;
  org_name: string;
  contact_name: string;
  phone: string;
  stage: string;
  pillar: string;
  requirement: string;
  protected_until: string | null;
  partners?: { full_name: string; email: string } | null;
};

export default function AdminLeadsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/partners/dashboard");
    }
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/leads");
    const data = await res.json();
    if (res.ok) setLeads(data.leads || []);
  }

  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function setStage(id: string, stage: string) {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    await load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex justify-between gap-3 flex-wrap">
            <h1 className="text-2xl font-bold">Admin · All leads</h1>
            <Link href="/admin/partners" className="text-sm text-[var(--color-accent)]">
              ← Partners
            </Link>
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/40 text-xs uppercase text-white/50">
                <tr>
                  <th className="px-3 py-2">Organisation</th>
                  <th className="px-3 py-2">Partner</th>
                  <th className="px-3 py-2">Pillar</th>
                  <th className="px-3 py-2">Stage</th>
                  <th className="px-3 py-2">Protected</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-white/5">
                    <td className="px-3 py-3">
                      <div className="font-medium">{l.org_name}</div>
                      <div className="text-xs text-white/45">
                        {l.contact_name} · {l.phone}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      {l.partners?.full_name || "—"}
                      <div className="text-white/40">{l.partners?.email}</div>
                    </td>
                    <td className="px-3 py-3 capitalize">{l.pillar}</td>
                    <td className="px-3 py-3">
                      <select
                        value={l.stage}
                        onChange={(e) => setStage(l.id, e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-xs"
                      >
                        {LEAD_STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3 text-xs text-white/50">
                      {l.protected_until
                        ? new Date(l.protected_until).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-white/50">
                      No leads yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
