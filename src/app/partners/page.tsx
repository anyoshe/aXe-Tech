import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sales Partners | GetAxe Kenya",
  description:
    "Become a GetAxe independent sales partner — sell ICT hardware, software and services on commission in Kenya.",
};

export default function PartnersLandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <section className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
            Partner programme
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
            Sell GetAxe solutions. Earn on real business.
          </h1>
          <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
            Join as an independent sales partner. GetAxe owns the brand, pricing, customers and
            payments — you bring relationships and close deals. Commission is paid when the client
            pays GetAxe.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {[
              "Hardware, software (ERP, business systems), labs, networking and support",
              "Training and a digital portal for leads and follow-ups",
              "No guaranteed salary — pay follows collected revenue",
              "Flexible remote work across Kenya",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/partners/apply"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm"
            >
              Apply to partner <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/partners/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
            >
              Partner login
            </Link>
          </div>
          <p className="mt-8 text-xs text-white/45">
            We do not publish commission rates publicly. Approved partners receive the policy after
            screening.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
