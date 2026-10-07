import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Home,
  MessageCircle,
  Store,
  Users,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Software & ERP | GetAxe Kenya",
  description:
    "GetAxe software: School ERP, Business Management System, Chama Fund Vault, and Life Legacy (coming soon). Demo and quotation available.",
};

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20want%20to%20discuss%20software%20%2F%20ERP.";

const products = [
  {
    id: "school-erp",
    title: "School ERP",
    audience: "Schools & institutions",
    icon: GraduationCap,
    status: "live" as const,
    text: "Students, classes, fees, staff tools and day-to-day school operations — with an interactive demo you can try before you decide.",
    points: [
      "Student & class records",
      "Fees and invoices",
      "Assignments & operations",
      "Training on rollout",
    ],
    primary: { href: "/school-erp", label: "School ERP overview" },
    secondary: { href: "/school-erp/demo", label: "Try demo", external: false },
  },
  {
    id: "business",
    title: "Business Management System",
    audience: "SMEs & shops",
    icon: Store,
    status: "live" as const,
    text: "Sales, stock, expenses and customers in one place so owners run the business on facts — including a live system you can open.",
    points: [
      "Sales & stock visibility",
      "Expenses and reports",
      "Multi-user access",
      "Demo / live system access",
    ],
    primary: { href: "/business-management", label: "Business system overview" },
    secondary: {
      href: "https://app.getaxekenya.com/",
      label: "Open live app",
      external: true,
    },
  },
  {
    id: "chama",
    title: "Chama Fund Vault",
    audience: "Chamas & savings groups",
    icon: Users,
    status: "live" as const,
    text: "Digital tools for chama contributions, records and transparency — so groups track funds with less paper and more trust.",
    points: [
      "Group fund tracking",
      "Member contributions",
      "Clearer records",
      "Built for Kenyan chamas",
    ],
    primary: {
      href: "https://chama-fund-vault-pi.vercel.app/",
      label: "Open Chama Fund Vault",
      external: true,
    },
    secondary: {
      href: "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20want%20a%20quotation%20for%20Chama%20Fund%20Vault.",
      label: "Request quotation",
      external: true,
    },
  },
  {
    id: "life-legacy",
    title: "Life Legacy",
    audience: "Families & estate planning",
    icon: Heart,
    status: "coming_soon" as const,
    text: "A GetAxe product in development — focused on life and legacy planning tools. Join the interest list for early access when we launch.",
    points: [
      "In active development",
      "Early access on request",
      "Built for Kenyan families",
      "Announcements via GetAxe",
    ],
    primary: {
      href: "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20am%20interested%20in%20Life%20Legacy%20(coming%20soon).",
      label: "Register interest",
      external: true,
    },
    secondary: null,
  },
];

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
            Software for schools, businesses, chamas — and more on the way.
          </h1>
          <p className="mt-4 text-white/65 max-w-2xl leading-relaxed">
            Live products you can open today, plus upcoming builds. Each solves a
            different job — pick what matches your organisation, then demo or request a quotation.
          </p>
          <Link
            href="/"
            className="inline-flex mt-4 text-sm text-white/60 hover:text-[var(--color-accent)]"
          >
            ← Back to home
          </Link>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {products.map((p) => (
              <article
                key={p.id}
                className={`rounded-2xl border p-6 md:p-8 flex flex-col ${
                  p.status === "coming_soon"
                    ? "border-dashed border-white/20 bg-white/[0.03]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center">
                    <p.icon className="w-5 h-5" />
                  </div>
                  {p.status === "live" ? (
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-600/90 text-white font-semibold">
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-semibold">
                      <Clock className="w-3 h-3" /> Coming soon
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold">{p.title}</h2>
                <p className="mt-1 text-sm text-[var(--color-accent)] font-medium">
                  {p.audience}
                </p>
                <p className="mt-3 text-sm text-white/65 leading-relaxed flex-1">
                  {p.text}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {p.points.map((t) => (
                    <li key={t} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={p.primary.href}
                    {...(p.primary.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-4 py-2.5 text-sm hover:brightness-110"
                  >
                    {p.primary.label}
                    {p.primary.external ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </a>
                  {p.secondary && (
                    <a
                      href={p.secondary.href}
                      {...(p.secondary.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/5"
                    >
                      {p.secondary.label}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-black/30 p-6 text-center">
            <p className="text-white/70 text-sm max-w-xl mx-auto">
              Not sure which product fits? Tell us if you run a{" "}
              <strong className="text-white">school</strong>,{" "}
              <strong className="text-white">business</strong>, or{" "}
              <strong className="text-white">chama</strong> — we will guide you and quote clearly.
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
