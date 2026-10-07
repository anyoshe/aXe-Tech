import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Home,
  MessageCircle,
  Store,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Software & ERP | GetAxe Kenya",
  description:
    "Choose GetAxe software: School ERP for schools, or Business Management System for SMEs. Demo and quotation available.",
};

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20want%20to%20discuss%20software%20%2F%20ERP.";

export default function SoftwareHubPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        <div className="border-b border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-[var(--color-accent)]"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white">Software & ERP</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
            Software & ERP
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
            Two systems. Pick the one that matches your organisation.
          </h1>
          <p className="mt-4 text-white/65 max-w-2xl leading-relaxed">
            GetAxe builds software for schools and for businesses. They solve different
            jobs — choose below, then demo or request a quotation.
          </p>
          <Link
            href="/"
            className="inline-flex mt-4 text-sm text-white/60 hover:text-[var(--color-accent)]"
          >
            ← Back to home
          </Link>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {/* School ERP */}
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">School ERP</h2>
              <p className="mt-1 text-sm text-[var(--color-accent)] font-medium">
                For schools & institutions
              </p>
              <p className="mt-3 text-sm text-white/65 leading-relaxed flex-1">
                Students, classes, fees, staff tools and day-to-day school operations —
                with an interactive demo you can try before you decide.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {["Student & class records", "Fees and invoices", "Assignments & operations", "Training on rollout"].map(
                  (t) => (
                    <li key={t} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      {t}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/school-erp"
                  className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2.5 text-sm"
                >
                  School ERP overview <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/school-erp/demo"
                  className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/5"
                >
                  Try demo
                </Link>
              </div>
            </article>

            {/* Business Management */}
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center mb-4">
                <Store className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">Business Management System</h2>
              <p className="mt-1 text-sm text-[var(--color-accent)] font-medium">
                For SMEs & shops
              </p>
              <p className="mt-3 text-sm text-white/65 leading-relaxed flex-1">
                Sales, stock, expenses and customers in one place so owners run the
                business on facts — including a live system you can open.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {["Sales & stock visibility", "Expenses and reports", "Multi-user access", "Demo / live system access"].map(
                  (t) => (
                    <li key={t} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      {t}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/business-management"
                  className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2.5 text-sm"
                >
                  Business system overview <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://app.getaxekenya.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/5"
                >
                  Open live app
                </a>
              </div>
            </article>
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-black/30 p-6 text-center">
            <p className="text-white/70 text-sm max-w-xl mx-auto">
              Not sure which fits? Tell us whether you run a <strong className="text-white">school</strong> or a{" "}
              <strong className="text-white">business</strong> — we will point you to the right product and quotation.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--color-primary-hover)]"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp GetAxe
              </a>
              <Link
                href="/contactus"
                className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/5"
              >
                Contact form
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
