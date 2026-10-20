import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JOURNAL_URL = "https://journal.getaxekenya.com/";

export const metadata: Metadata = {
  title: "Life & Legacy Journal | GetAxe Kenya",
  description:
    "Plan your life. Organize your goals. Track your progress. Build your legacy. Life & Legacy Journal helps you turn vision into goals, organize daily tasks, manage finances and relationships, and stay intentional.",
  alternates: {
    canonical: "https://getaxekenya.com/life-legacy",
  },
  openGraph: {
    title: "Life & Legacy Journal | GetAxe Kenya",
    description:
      "Plan your life. Organize your goals. Track your progress. Build your legacy.",
    url: "https://getaxekenya.com/life-legacy",
    siteName: "GetAxe Kenya",
    type: "website",
  },
};

const pillars = [
  {
    title: "Vision → goals",
    text: "Turn your life purpose and vision into actionable goals with clear targets and timelines.",
  },
  {
    title: "Daily tasks",
    text: "Organize what you need to do each day so everyday actions connect to the life you are building.",
  },
  {
    title: "Finances & relationships",
    text: "Manage money and relationships alongside your plans — not in separate, forgotten notes.",
  },
  {
    title: "Dreams & progress",
    text: "Pursue dreams and track progress so you stay accountable and intentional.",
  },
  {
    title: "Focus & accountability",
    text: "One platform that links purpose to daily action, so you stay focused on the life you want.",
  },
  {
    title: "Build your legacy",
    text: "Consistent plans and follow-through compound into the legacy you set out to create.",
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
            <span className="text-white">Life &amp; Legacy</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
              GetAxe product · journal.getaxekenya.com
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Life &amp; Legacy Journal
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-medium text-white/90 leading-snug">
              Plan your life. Organize your goals. Track your progress. Build your legacy.
            </p>
            <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
              Life &amp; Legacy Journal is a personal life-management platform that helps you
              turn your vision into actionable goals, organize your daily tasks, manage your
              finances and relationships, pursue your dreams, and track your progress against
              clear targets and timelines.
            </p>
            <p className="mt-4 text-base text-white/65 leading-relaxed">
              It connects your life purpose with your everyday actions, helping you stay focused,
              accountable, and intentional about the life you want to build.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={JOURNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3.5 text-sm hover:brightness-110"
              >
                Open Life &amp; Legacy Journal →
              </a>
              <a
                href="https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20want%20to%20know%20more%20about%20Life%20%26%20Legacy%20Journal."
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

          <p className="mt-12 text-xs text-white/40">
            Live app:{" "}
            <a href={JOURNAL_URL} className="text-white/60 underline break-all">
              {JOURNAL_URL}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
