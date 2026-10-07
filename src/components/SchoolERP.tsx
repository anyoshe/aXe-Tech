"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  Phone,
  Home,
  MessageCircle,
  Users,
  Wallet,
  BookOpen,
  LayoutDashboard,
  ClipboardList,
  Settings,
  GraduationCap,
} from "lucide-react";

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20a%20quotation%20%2F%20demo%20for%20School%20ERP.";
const PHONE = "tel:+254736889880";

const outcomes = [
  {
    title: "Students & classes",
    text: "Records, class lists and structure that match how your school actually runs.",
    icon: Users,
  },
  {
    title: "Fees & invoices",
    text: "Track what is owed and paid — less chasing paper and spreadsheet chaos.",
    icon: Wallet,
  },
  {
    title: "Academics & work",
    text: "Assignments and day-to-day academic operations in one place.",
    icon: BookOpen,
  },
  {
    title: "Leadership visibility",
    text: "A clearer picture for principals and administrators without waiting for manual reports.",
    icon: LayoutDashboard,
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "Understand your school size, terms and what must work first.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Configure",
    desc: "Set up modules, users and data migration approach with your team.",
    icon: Settings,
  },
  {
    step: "03",
    title: "Train & go live",
    desc: "Staff learn the daily flow; you start using real school data.",
    icon: GraduationCap,
  },
  {
    step: "04",
    title: "Support",
    desc: "Help after launch so the system stays used through the term.",
    icon: Phone,
  },
];

const packages = [
  {
    name: "Starter",
    forWho: "Smaller schools starting digital records",
    features: [
      "Core student records",
      "Basic fee tracking",
      "Guided onboarding",
      "Email / WhatsApp support path",
    ],
  },
  {
    name: "Professional",
    forWho: "Growing schools needing full operations",
    features: [
      "Students, fees and staff tools",
      "Assignments & operations views",
      "Training for your team",
      "Priority support options",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    forWho: "Larger schools and multi-campus setups",
    features: [
      "Multi-branch ready approach",
      "Custom workflow discussion",
      "Dedicated support options",
      "Integration conversations as needed",
    ],
  },
];

const faqs = [
  {
    q: "Is this the same as Business Management?",
    a: "No. School ERP is for schools (students, fees, academics). Business Management is for SMEs (sales, stock, expenses). Different products, same GetAxe team.",
  },
  {
    q: "How do we get a price?",
    a: "By quotation after we understand learners, campuses and modules. We do not publish a public price list that ignores your reality.",
  },
  {
    q: "Can we try before buying?",
    a: "Yes — use the interactive demo and/or book a live walkthrough tailored to your school.",
  },
  {
    q: "Do you train staff?",
    a: "Training is part of a proper rollout, not an optional extra we forget after install.",
  },
];

export default function SchoolERPPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-dark)] text-white">
      <div className="border-b border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-[var(--color-accent)]"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">School ERP</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] mb-4">
            <Shield className="w-3.5 h-3.5" />
            School ERP · Kenyan schools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Run the school with one system — students, fees and daily operations.
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
            GetAxe School ERP is built for how schools work: admissions and records,
            fees, staff tools and visibility for leadership — with demo, training and
            a clear quotation for your institution.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="/school-erp/demo"
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110"
            >
              Try interactive demo
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
            >
              <MessageCircle className="w-4 h-4" /> Request quotation
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[var(--color-accent)] px-2 py-3"
            >
              ← Back to home
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Live demo
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Quotation-based
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Training on rollout
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="/samples/ERp.jpg"
            alt="School ERP system"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 border border-white/10 p-4 text-sm">
            Students · Fees · Academics · Leadership views
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What schools gain</h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            Practical outcomes for administrators and teachers — not a feature dump.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <o.icon className="w-5 h-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-accent)]">{o.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How rollout works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((s) => (
              <div key={s.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--color-accent)] font-bold">{s.step}</span>
                  <s.icon className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Packages (quoted to fit your school)</h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            Starting points only — final scope and price come after discovery.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  pkg.popular
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {pkg.popular && (
                  <span className="text-xs font-bold text-[var(--color-accent)] mb-2">
                    OFTEN CHOSEN
                  </span>
                )}
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className="text-sm text-white/70 mt-1">{pkg.forWho}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-white/75">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block text-center rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm hover:brightness-110"
                >
                  Request quotation
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold mb-4 text-white/80">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/school-erp/demo" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">
              Interactive demo
            </Link>
            <Link href="/business-management" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">
              Business management (SMEs)
            </Link>
            <Link href="/computer-lab-setup" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">
              Computer labs
            </Link>
            <Link href="/shop" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">
              ICT products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10 bg-black/20">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-white/65">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 border-t border-white/10 text-center px-4">
        <h2 className="text-2xl font-bold">See School ERP with your school in mind</h2>
        <p className="mt-2 text-white/65 max-w-lg mx-auto">
          Demo first, quotation second — no public price cards.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center flex-wrap gap-3">
          <Link
            href="/school-erp/demo"
            className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3 text-sm"
          >
            Open demo
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 font-semibold px-6 py-3 text-sm inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href={PHONE}
            className="rounded-xl border border-white/20 font-semibold px-6 py-3 text-sm inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" /> +254 736 889 880
          </a>
          <Link
            href="/"
            className="rounded-xl text-sm text-white/70 hover:text-[var(--color-accent)] px-6 py-3 inline-flex items-center justify-center gap-1"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </section>
    </div>
  );
}
