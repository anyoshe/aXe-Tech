import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  LineChart,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Store,
  Users,
  Wallet,
  Home,
  ClipboardList,
  Settings,
  GraduationCap,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const whatsappUrl =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20a%20quotation%20%2F%20demo%20for%20the%20Business%20Management%20System.";
const businessSystemUrl = "https://app.getaxekenya.com";
const PHONE = "tel:+254736889880";

export const metadata: Metadata = {
  title: "Business Management System | GetAxe Kenya",
  description:
    "GetAxe Business Management System helps SMEs manage sales, stock, expenses and customers. Request a demo or quotation — no public price list.",
  alternates: { canonical: "/business-management" },
};

const outcomes = [
  {
    title: "See the business clearly",
    text: "Sales, stock and expenses in one place — not scattered notebooks and guesses.",
    icon: Eye,
  },
  {
    title: "Stay in control remotely",
    text: "Know what is happening even when you are away from the counter.",
    icon: ShieldCheck,
  },
  {
    title: "Decide with facts",
    text: "Use reports to decide what to stock, cut or push — not gut feel alone.",
    icon: LineChart,
  },
  {
    title: "Protect stock and cash",
    text: "Track inventory movement and business activity so leakage is harder to hide.",
    icon: Package,
  },
  {
    title: "Serve customers better",
    text: "Keep customer and sales history organized for follow-up and loyalty.",
    icon: Users,
  },
  {
    title: "Plan growth",
    text: "Use what the system shows to plan purchasing and expansion with less risk.",
    icon: BarChart3,
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We learn how your business sells, stocks and reports today.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Configure",
    desc: "Set up the system around your products, users and workflow.",
    icon: Settings,
  },
  {
    step: "03",
    title: "Train & go live",
    desc: "Your team learns the daily flow; you start recording real activity.",
    icon: GraduationCap,
  },
  {
    step: "04",
    title: "Support",
    desc: "Help when you need it — so the system stays used, not abandoned.",
    icon: Phone,
  },
];

const modules = [
  { title: "Sales", text: "Record sales and see performance over time." },
  { title: "Stock", text: "Track what you have, what moved and what needs reorder." },
  { title: "Expenses", text: "Capture costs so profit is not a mystery." },
  { title: "Customers", text: "Keep contacts and history where the team can find them." },
  { title: "Reports", text: "Simple views for owners and managers." },
  { title: "Multi-user", text: "Roles for staff without giving everyone full control." },
];

const faqs = [
  {
    q: "Is this the same as School ERP?",
    a: "No. School ERP is built for schools (students, fees, academics). This system is for businesses — sales, stock, expenses and customers. Both are GetAxe software; different jobs.",
  },
  {
    q: "How do we get pricing?",
    a: "We quote after understanding users, branches and modules you need. There is no public price list — you receive a clear quotation.",
  },
  {
    q: "Can we try before we commit?",
    a: "Yes. Request a demo or access the business system walkthrough. We align the demo to your type of business.",
  },
  {
    q: "Who is it for?",
    a: "Retail, wholesale, small chains and service businesses that need visibility beyond a till receipt and a notebook.",
  },
];

export default function BusinessManagementPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[var(--color-bg-dark)] text-white">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-[var(--color-accent)] transition"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/#solutions" className="hover:text-[var(--color-accent)]">
              Solutions
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white">Business management</span>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] mb-4">
              <Store className="w-3.5 h-3.5" />
              Business software · SMEs & growing shops
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Run your business with facts — not guesswork.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              GetAxe Business Management System brings sales, stock, expenses and
              customers together so owners see what is really happening — at the
              counter and away from it.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110"
              >
                <MessageCircle className="w-4 h-4" />
                Request demo / quotation
              </a>
              <a
                href={businessSystemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
              >
                Open system <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/"
                className="inline-flex justify-center items-center gap-2 text-sm text-white/60 hover:text-[var(--color-accent)] px-2 py-3"
              >
                ← Back to home
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Demo available
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Quotation-based
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Training & support
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--color-primary)]/20 to-white/5 p-8">
            <Wallet className="w-10 h-10 text-[var(--color-accent)] mb-4" />
            <h2 className="text-xl font-bold">Built for operators</h2>
            <p className="mt-2 text-sm text-white/65 leading-relaxed">
              Not a generic foreign ERP dump. Focused on the daily rhythm of Kenyan
              SMEs: sell, stock, spend, review — with a path to get help from GetAxe
              when you need it.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              {[
                "Sales and stock visibility",
                "Expense awareness",
                "Owner-friendly reports",
                "Team access with control",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-t border-white/10 bg-black/20 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">What you gain</h2>
            <p className="text-white/60 mb-8 max-w-2xl">
              Outcomes that matter to owners — not feature jargon alone.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {outcomes.map((o) => (
                <div
                  key={o.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <o.icon className="w-5 h-5 text-[var(--color-primary)] mb-3" />
                  <h3 className="font-semibold text-[var(--color-accent)]">{o.title}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">{o.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="py-14 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Core areas</h2>
            <p className="text-white/60 mb-8 max-w-2xl">
              Modules are scoped in your quotation — start with what you need now.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-14 border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How onboarding works</h2>
            <p className="text-white/60 mb-10 max-w-2xl">
              Software only helps if the team adopts it. We plan for that.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[var(--color-accent)] font-bold text-lg">
                      {s.step}
                    </span>
                    <s.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related software — keep School ERP separate but linked */}
        <section className="py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold mb-2 text-white/80">
              Other GetAxe software
            </h2>
            <p className="text-sm text-white/50 mb-4 max-w-2xl">
              School operations use a different product. Business management stays
              focused on SMEs — pick the system that matches your organisation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/school-erp"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
              >
                School ERP
              </Link>
              <Link
                href="/school-erp/demo"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
              >
                School ERP demo
              </Link>
              <Link
                href="/it-support"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
              >
                IT support
              </Link>
              <Link
                href="/shop"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
              >
                ICT products
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 border-t border-white/10 bg-black/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Questions owners ask</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              See the system with your business in mind
            </h2>
            <p className="mt-3 text-white/65">
              Demo and quotation — no public pricing. We scope users and modules with you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3 text-sm inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp GetAxe
              </a>
              <a
                href={businessSystemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/20 font-semibold px-6 py-3 text-sm"
              >
                Access business system
              </a>
              <a
                href={PHONE}
                className="rounded-xl border border-white/20 font-semibold px-6 py-3 text-sm inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> +254 736 889 880
              </a>
              <Link
                href="/"
                className="rounded-xl text-sm font-medium text-white/70 hover:text-[var(--color-accent)] px-6 py-3 inline-flex items-center justify-center gap-1"
              >
                <Home className="w-4 h-4" /> Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
