import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const JOURNAL_URL = "https://journal.getaxekenya.com/";

export const metadata: Metadata = {
  title: "Life Legacy Journal | GetAxe Kenya",
  description:
    "Life Legacy by GetAxe — a journal for families to organise important life records and plans. Open the live app at journal.getaxekenya.com.",
  alternates: {
    canonical: "https://getaxekenya.com/life-legacy",
  },
  openGraph: {
    title: "Life Legacy Journal | GetAxe Kenya",
    description:
      "Organise important life records and plans. Live product from GetAxe Technologies.",
    url: "https://getaxekenya.com/life-legacy",
    siteName: "GetAxe Kenya",
    type: "website",
  },
};

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

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
            GetAxe product
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Life Legacy journal
          </h1>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            Life Legacy helps families organise important life records and plans in one
            place. It is a live GetAxe product you can open online.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/75">
            <li>• Guided journal experience for life and legacy planning</li>
            <li>• Built for Kenyan families</li>
            <li>• Access anytime at journal.getaxekenya.com</li>
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
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

          <p className="mt-12 text-xs text-white/40">
            Product URL:{" "}
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
