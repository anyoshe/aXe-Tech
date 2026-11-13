"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type RequestRow = { id: string; product_category: string; preferred_brand?: string; preferred_model?: string; processor?: string; ram?: string; storage?: string; condition_preference?: string; budget?: number | null; customer_name: string; customer_contact: string; customer_email?: string; additional_requirements?: string; status: string; created_at: string };

export default function ProductSourcingAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<RequestRow[]>([]);
  useEffect(() => { if (status === "unauthenticated" || (status === "authenticated" && session?.user?.role !== "admin")) router.replace("/partners/login"); }, [status, session, router]);
  useEffect(() => { if (session?.user?.role === "admin") fetch("/api/product-sourcing").then((r) => r.json()).then((d) => setRequests(d.requests || [])); }, [session]);
  return <main className="min-h-screen bg-zinc-950 text-white p-6"><div className="mx-auto max-w-5xl"><h1 className="text-2xl font-bold">Product sourcing requests</h1><p className="text-sm text-white/55 mt-1">Requests do not create or reserve stock.</p><div className="mt-6 space-y-3">{requests.map((r) => <article key={r.id} className="rounded-xl border border-white/10 p-4"><div className="flex justify-between gap-3"><h2 className="font-semibold">{r.preferred_brand} {r.preferred_model} · {r.product_category}</h2><span className="text-xs text-emerald-200">{r.status}</span></div><p className="mt-2 text-sm text-white/70">{[r.processor, r.ram, r.storage, r.condition_preference, r.budget != null ? `Budget KES ${Number(r.budget).toLocaleString()}` : null].filter(Boolean).join(" · ")}</p><p className="mt-2 text-sm">{r.customer_name} · {r.customer_contact}{r.customer_email ? ` · ${r.customer_email}` : ""}</p>{r.additional_requirements && <p className="mt-2 text-sm text-white/60">{r.additional_requirements}</p>}<time className="mt-2 block text-xs text-white/40">{new Date(r.created_at).toLocaleString()}</time></article>)}{requests.length === 0 && <p className="text-sm text-white/50">No sourcing requests.</p>}</div></div></main>;
}
