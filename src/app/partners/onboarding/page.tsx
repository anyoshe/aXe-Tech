"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CrmShell,
  CrmStat,
  StageBadge,
} from "@/components/crm/CrmShell";

type Partner = {
  full_name?: string;
  status?: string;
  agreement_accepted_at?: string | null;
  training_completed_at?: string | null;
  referral_code?: string | null;
  onboarding_quiz_score?: number | null;
};

const QUIZ = [
  {
    q: "Who receives client payments?",
    options: ["The sales partner", "GetAxe company accounts only", "The technician"],
    a: 1,
  },
  {
    q: "When is commission earned?",
    options: ["When a lead is registered", "When a quote is sent", "When payment has cleared"],
    a: 2,
  },
  {
    q: "Who owns the customer record?",
    options: ["The partner forever", "GetAxe", "Whoever closed the deal personally"],
    a: 1,
  },
];

export default function PartnerOnboardingPage() {
  const { status } = useSession();
  const router = useRouter();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
  const [quizMsg, setQuizMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/partners/login");
  }, [status, router]);

  async function load() {
    const res = await fetch("/api/partners/me");
    const d = await res.json();
    if (res.ok) setPartner(d.partner);
  }
  useEffect(() => {
    if (status === "authenticated") load();
  }, [status]);

  async function patch(body: Record<string, unknown>) {
    setBusy(true);
    const res = await fetch("/api/partners/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const d = await res.json();
    setBusy(false);
    if (res.ok) setPartner(d.partner);
    else setQuizMsg(d.error || "Failed");
  }

  function submitQuiz() {
    let score = 0;
    QUIZ.forEach((item, i) => {
      if (answers[i] === item.a) score += 1;
    });
    const pct = Math.round((score / QUIZ.length) * 100);
    setQuizMsg(`Score: ${pct}%. ${pct >= 67 ? "Pass — mark training complete." : "Review training and retry."}`);
    if (pct >= 67) {
      patch({ onboarding_quiz_score: pct, complete_training: true });
    } else {
      patch({ onboarding_quiz_score: pct });
    }
  }

  const steps = [
    { done: !!partner?.agreement_accepted_at, label: "Accept partner rules" },
    { done: !!partner?.training_completed_at, label: "Training + quiz" },
    { done: !!partner?.referral_code, label: "Referral code" },
    {
      done: ["CERTIFIED", "ACTIVE"].includes(partner?.status || ""),
      label: "Admin certifies / activates you",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CrmShell
          title="Onboarding"
          subtitle="Complete agreement and training. Admin sets CERTIFIED/ACTIVE before you can register leads."
          nav={[
            { href: "/partners/dashboard", label: "Leads" },
            { href: "/partners/onboarding", label: "Onboarding", active: true },
            { href: "/partners/training", label: "Training" },
            { href: "/partners/quotes", label: "Quotes" },
            { href: "/partners/commissions", label: "Commissions" },
          ]}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <CrmStat label="Status" value={partner?.status || "—"} />
            <CrmStat
              label="Steps done"
              value={`${steps.filter((s) => s.done).length}/${steps.length}`}
            />
          </div>

          <ol className="space-y-3 mb-8">
            {steps.map((s, i) => (
              <li
                key={s.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f1624] px-4 py-3 text-sm"
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    s.done ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/50"
                  }`}
                >
                  {s.done ? "✓" : i + 1}
                </span>
                <span className={s.done ? "text-white/90" : "text-white/55"}>{s.label}</span>
              </li>
            ))}
          </ol>

          <div className="space-y-6 max-w-2xl">
            <section className="rounded-2xl border border-white/10 bg-[#0f1624] p-5">
              <h2 className="font-semibold">1. Partner rules</h2>
              <ul className="mt-3 text-sm text-white/60 space-y-1 list-disc pl-5">
                <li>Clients pay GetAxe only (Paybill / bank) — never personal M-Pesa.</li>
                <li>Commission only on cleared funds.</li>
                <li>GetAxe owns customers; you own commercial responsibility while active.</li>
                <li>Register every lead in CRM; approved prices only.</li>
              </ul>
              <button
                type="button"
                disabled={busy || !!partner?.agreement_accepted_at}
                onClick={() => patch({ accept_agreement: true })}
                className="mt-4 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm disabled:opacity-40"
              >
                {partner?.agreement_accepted_at ? "Agreement accepted" : "I accept these rules"}
              </button>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#0f1624] p-5">
              <h2 className="font-semibold">2. Short certification quiz</h2>
              <p className="text-xs text-white/45 mt-1">
                Read <Link href="/partners/training" className="text-[var(--color-accent)]">Training</Link> first. Pass ≥67%.
              </p>
              <div className="mt-4 space-y-4">
                {QUIZ.map((item, i) => (
                  <div key={item.q}>
                    <p className="text-sm font-medium">{item.q}</p>
                    <div className="mt-2 space-y-1">
                      {item.options.map((opt, j) => (
                        <label key={opt} className="flex gap-2 text-sm text-white/70 cursor-pointer">
                          <input
                            type="radio"
                            name={`q${i}`}
                            checked={answers[i] === j}
                            onChange={() => {
                              const next = [...answers];
                              next[i] = j;
                              setAnswers(next);
                            }}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                disabled={busy || answers.some((a) => a < 0)}
                onClick={submitQuiz}
                className="mt-4 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold disabled:opacity-40"
              >
                Submit quiz
              </button>
              {quizMsg && <p className="mt-2 text-sm text-[var(--color-accent)]">{quizMsg}</p>}
              {partner?.onboarding_quiz_score != null && (
                <p className="mt-1 text-xs text-white/40">Last score: {partner.onboarding_quiz_score}%</p>
              )}
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#0f1624] p-5">
              <h2 className="font-semibold">3. Your referral code</h2>
              <p className="text-sm text-white/55 mt-1">
                Share links like <code className="text-white/80">getaxekenya.com/partners/apply?ref=YOURCODE</code>
              </p>
              {partner?.referral_code ? (
                <p className="mt-3 text-lg font-mono font-bold text-[var(--color-accent)]">
                  {partner.referral_code}
                </p>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => patch({ generate_referral_code: true })}
                  className="mt-4 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2 text-sm"
                >
                  Generate code
                </button>
              )}
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#0f1624] p-5 text-sm text-white/60">
              <h2 className="font-semibold text-white">4. Activation</h2>
              <p className="mt-2">
                Current status:{" "}
                {partner?.status ? <StageBadge stage={partner.status} /> : "—"}
              </p>
              <p className="mt-2">
                After training, GetAxe admin moves you to <strong>CERTIFIED</strong> then{" "}
                <strong>ACTIVE</strong> so you can register leads.
              </p>
            </section>
          </div>
        </CrmShell>
      </main>
    </>
  );
}
