"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
  follow_up_at: string | null;
  protected_until: string | null;
  requirement: string;
  updated_at: string;
};

export default function PartnerDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [partner, setPartner] = useState<{ full_name?: string; status?: string; specialty?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role === "admin") {
      router.push("/admin/partners");
    }
  }, [status, session, router]);

  async function load() {
    try {
      const [meRes, leadRes] = await Promise.all([
        fetch("/api/partners/me"),
        fetch("/api/leads"),
      ]);
      const me = await meRes.json();
      const ld = await leadRes.json();
      if (!meRes.ok) throw new Error(me.error || "Auth error");
      if (!leadRes.ok) throw new Error(ld.error || "Could not load leads");
      setPartner(me.partner || null);
      setLeads(ld.leads || []);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "partner") load();
  }, [status, session]);

  async function setStage(id: string, stage: string) {
    setUpdating(id);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    await load();
    setUpdating(null);
  }

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const followUps = leads.filter(
    (l) => l.follow_up_at && new Date(l.follow_up_at) <= new Date(Date.now() + 86400000 * 3)
  );

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--color-accent)] font-semibold">Partner dashboard</p>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">
                {partner?.full_name || session.user?.name || "Partner"}
              </h1>
              <p className="text-sm text-white/55 mt-1">
                Status: <span className="text-white">{partner?.status}</span>
                {partner?.specialty ? ` · ${partner.specialty}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/partners/leads/new"
                className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm"
              >
                + Register lead
              </Link>
              <Link href="/partners/quotes" className="rounded-xl border border-white/20 px-4 py-2 text-sm">
                Quotes
              </Link>
              <Link href="/partners/commissions" className="rounded-xl border border-white/20 px-4 py-2 text-sm">
                Commissions
              </Link>
              <Link href="/partners/training" className="rounded-xl border border-white/20 px-4 py-2 text-sm">
                Training
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/partners/login" })}
                className="rounded-xl border border-white/20 px-4 py-2 text-sm"
              >
                Sign out
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/50">My leads</p>
              <p className="text-2xl font-bold mt-1">{leads.length}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/50">Follow-ups (3 days)</p>
              <p className="text-2xl font-bold mt-1">{followUps.length}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/50">Won</p>
              <p className="text-2xl font-bold mt-1">
                {leads.filter((l) => l.stage === "WON" || l.stage === "PAYMENT").length}
              </p>
            </div>
          </div>

          <h2 className="mt-10 text-lg font-semibold">Pipeline</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-black/40 text-white/50 text-xs uppercase">
                <tr>
                  <th className="px-3 py-2">Organisation</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">Pillar</th>
                  <th className="px-3 py-2">Stage</th>
                  <th className="px-3 py-2">Protected</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-white/50">
                      No leads yet. Register your first opportunity.
                    </td>
                  </tr>
                )}
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-white/5">
                    <td className="px-3 py-3">
                      <div className="font-medium">{l.org_name}</div>
                      <div className="text-xs text-white/45 line-clamp-1">{l.requirement}</div>
                    </td>
                    <td className="px-3 py-3">
                      {l.contact_name}
                      <div className="text-xs text-white/45">{l.phone}</div>
                    </td>
                    <td className="px-3 py-3 capitalize">{l.pillar}</td>
                    <td className="px-3 py-3">
                      <select
                        value={l.stage}
                        disabled={updating === l.id}
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
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
