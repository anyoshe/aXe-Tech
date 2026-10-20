import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JOURNAL_URL = "https://journal.getaxekenya.com/";

export const metadata: Metadata = {
  title: "Life Legacy Journal — Goals, Plans & Focus | GetAxe Kenya",
  description:
    "Life Legacy by GetAxe keeps you organised: goals, vision and mission, to-do lists, finances, relationships, dreams and targets — tracked in one platform so you stay focused and achieve what you set out to do.",
  alternates: {
    canonical: "https://getaxekenya.com/life-legacy",
  },
  openGraph: {
    title: "Life Legacy Journal | GetAxe Kenya",
    description:
      "Organise your plans, goals, to-dos, finances and relationships in one focused life platform.",
    url: "https://getaxekenya.com/life-legacy",
    siteName: "GetAxe Kenya",
    type: "website",
  },
};

const pillars = [
  {
    title: "Goals & targets",
    text: "Key in what you want to achieve and track progress against clear targets and timelines.",
  },
  {
    title: "Vision & mission",
    text: "Write your direction once, then use it as the guideline for decisions and daily focus.",
  },
  {
    title: "To-do lists that matter",
    text: "Daily and weekly tasks linked to your goals — so your list moves you forward, not just keeps you busy.",
  },
  {
    title: "Finances & relationships",
    text: "Keep money and people dimensions visible alongside plans, not scattered across apps and notes.",
  },
  {
    title: "Dreams with deadlines",
    text: "Turn dreams into timed targets so life has structure, not only intention.",
  },
  {
    title: "One focused platform",
    text: "Plans, goals, and follow-through in one place — so you always know what to do next.",
  },
];

export default function LifeLegacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="border-b border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-[var(--color-accent)]">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/software" className="hover:text-[var(--color-accent)]">
              Software
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white">Life Legacy</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
              GetAxe product · journal.getaxekenya.com
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Stay organised. Know what to do. Live with focus.
            </h1>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              <strong className="text-white/90">Life Legacy</strong> is a journal platform for a
              focused life: your plans, goals, vision and mission, finances, relationships, dreams
              and targets — keyed in, tracked, and followed in one place. Your to-do list becomes a
              path toward the goals you set, on the timelines you choose.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={JOURNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3.5 text-sm hover:brightness-110"
              >
                Open Life Legacy →
              </a>
              <a
                href="https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20want%20to%20know%20more%20about%20Life%20Legacy."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold hover:bg-white/5"
              >
                Ask on WhatsApp
              </a>
              <Link
                href="/software"
                className="inline-flex justify-center items-center text-sm text-white/60 hover:text-[var(--color-accent)] px-2 py-3"
              >
                ← All software
              </Link>
            </div>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h2 className="font-semibold text-white">{p.title}</h2>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8">
            <h2 className="text-xl font-bold">How it helps</h2>
            <p className="mt-3 text-sm text-white/65 leading-relaxed">
              When you use Life Legacy, you keep and track a to-do list that is connected to real
              goals — so day-to-day actions accumulate into achievement. Guidelines and targets are
              set for specific periods, so you always know what matters next and how your life is
              resolving against the plan you wrote.
            </p>
            <a
              href={JOURNAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-5 text-sm font-semibold text-[var(--color-accent)] hover:underline"
            >
              Start at journal.getaxekenya.com →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
