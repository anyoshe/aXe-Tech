"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Quote = {
  id: string;
  pillar: string;
  solution_summary: string;
  status: string;
  qualification: Record<string, string>;
  partners?: { full_name: string; email: string } | null;
  leads?: { org_name: string; phone: string } | null;
};

export default function AdminQuotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [setup, setSetup] = useState<Record<string, string>>({});
  const [monthly, setMonthly] = useState<Record<string, string>>({});
  const [oneOff, setOneOff] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/partners/dashboard");
  }, [status, session, router]);

  async function load() {
    const res = await fetch("/api/quotes");
    const d = await res.json();
    if (res.ok) setQuotes(d.quotes || []);
  }
  useEffect(() => {
    if (session?.user?.role === "admin") load();
  }, [session]);

  async function approve(id: string) {
    await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "APPROVED",
        approved_setup_fee: setup[id] ? Number(setup[id]) : null,
        approved_monthly_fee: monthly[id] ? Number(monthly[id]) : null,
        approved_one_off: oneOff[id] ? Number(oneOff[id]) : null,
        approved_notes: notes[id] || null,
      }),
    });
    load();
  }

  async function reject(id: string) {
    await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "REJECTED", approved_notes: notes[id] || "Rejected" }),
    });
    load();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-wrap gap-3 justify-between">
            <h1 className="text-2xl font-bold">Admin · Quote approval</h1>
            <div className="flex gap-2 text-sm">
              <Link href="/admin/partners">Partners</Link>
              <Link href="/admin/deals">Deals</Link>
              <Link href="/admin/commissions">Commissions</Link>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {quotes.map((q) => (
              <div key={q.id} className="rounded-2xl border border-white/10 p-5 bg-white/5">
                <div className="flex justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-semibold">{q.leads?.org_name || "—"} · {q.pillar}</p>
                    <p className="text-xs text-white/50">
                      {q.partners?.full_name} · {q.partners?.email}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10">{q.status}</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{q.solution_summary}</p>
                <p className="text-xs text-white/40 mt-1">
                  Qual: {JSON.stringify(q.qualification || {})}
                </p>
                {q.status === "PENDING" && (
                  <div className="mt-4 grid sm:grid-cols-4 gap-2">
                    <input
                      placeholder="Setup fee"
                      value={setup[q.id] || ""}
                      onChange={(e) => setSetup({ ...setup, [q.id]: e.target.value })}
                      className="rounded-lg bg-black/40 border border-white/10 px-2 py-1.5 text-sm"
                    />
                    <input
                      placeholder="Monthly"
                      value={monthly[q.id] || ""}
                      onChange={(e) => setMonthly({ ...monthly, [q.id]: e.target.value })}
                      className="rounded-lg bg-black/40 border border-white/10 px-2 py-1.5 text-sm"
                    />
                    <input
                      placeholder="One-off"
                      value={oneOff[q.id] || ""}
                      onChange={(e) => setOneOff({ ...oneOff, [q.id]: e.target.value })}
                      className="rounded-lg bg-black/40 border border-white/10 px-2 py-1.5 text-sm"
                    />
                    <input
                      placeholder="Notes"
                      value={notes[q.id] || ""}
                      onChange={(e) => setNotes({ ...notes, [q.id]: e.target.value })}
                      className="rounded-lg bg-black/40 border border-white/10 px-2 py-1.5 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => approve(q.id)}
                      className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold text-sm py-1.5"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => reject(q.id)}
                      className="rounded-lg border border-red-400/40 text-red-300 text-sm py-1.5"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
            {quotes.length === 0 && <p className="text-white/50">No quote requests.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
