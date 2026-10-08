"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const sessions = [
  {
    title: "Session 1 — Company & culture",
    points: [
      "GetAxe is an ICT solutions partner (EQUIP · CONNECT · RUN · SUPPORT), not only a laptop shop.",
      "Customers pay GetAxe only — never personal M-Pesa of a partner or technician.",
      "GetAxe owns the customer; you own commercial responsibility while active.",
    ],
  },
  {
    title: "Session 2 — Portfolio",
    points: [
      "EQUIP: hardware catalogue and margin discipline.",
      "CONNECT: labs and networking as projects.",
      "RUN: School ERP, business systems/POS, Chama Vault — quote bands only.",
      "SUPPORT: maintenance contracts and recurring revenue.",
    ],
  },
  {
    title: "Session 3 — Qualification (BANT + Fit)",
    points: [
      "Budget — can they pay setup and monthly?",
      "Authority — principal, director, owner?",
      "Need — fees, stock, Wi‑Fi, labs?",
      "Timeline — when deploy?",
      "Fit — can GetAxe deliver?",
    ],
  },
  {
    title: "Session 4 — CRM, ethics & remote work",
    points: [
      "Register every lead before pitching.",
      "Lead protection: first valid CRM entry (30–60 days).",
      "Request quotes via portal — never invent complex prices.",
      "No cash collection, no side deals, confidentiality.",
    ],
  },
];

export default function PartnerTrainingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Link href="/partners/dashboard" className="text-sm text-white/60 hover:text-[var(--color-accent)]">
            ← Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold">GetAxe Sales Academy</h1>
          <p className="mt-2 text-white/65 text-sm">
            Complete these modules before CERTIFIED status. Admin marks training complete after assessment.
          </p>
          <div className="mt-10 space-y-6">
            {sessions.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="font-semibold text-[var(--color-accent)]">{s.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  {s.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-white/10 p-5 text-sm text-white/60">
            <p className="font-medium text-white">Non-negotiable rules</p>
            <ul className="mt-2 space-y-1">
              <li>1. Clients pay GetAxe only (Paybill / bank).</li>
              <li>2. Commission only on cleared funds.</li>
              <li>3. Every lead in CRM.</li>
              <li>4. Approved prices only.</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
