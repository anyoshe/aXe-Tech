import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  FileText,
  LineChart,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const whatsappUrl =
  "https://wa.me/254736889880?text=Hello%20GetAxe,%20I%27d%20like%20to%20see%20the%20Business%20Management%20System";

export const metadata: Metadata = {
  title: "GetAxe Business Management System | Business Management Software Kenya",
  description:
    "GetAxe Business Management System helps businesses manage sales, stock, expenses, customers and business performance from one system. Request a demo from GetAxe Technologies.",
  alternates: {
    canonical: "/business-management",
  },
  openGraph: {
    title: "GetAxe Business Management System",
    description:
      "Know what is happening in your business, even when you are away from the counter.",
    url: "/business-management",
    type: "website",
    images: [
      {
        url: "/gat-icon.png",
        width: 1200,
        height: 630,
        alt: "GetAxe Business Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetAxe Business Management System",
    description:
      "Run your business with facts, not guesswork. Request a GetAxe demo.",
    images: ["/gat-icon.png"],
  },
};

const outcomes = [
  { title: "Business visibility", text: "See what is happening in the business.", icon: Eye },
  { title: "Control", text: "Keep business activity and information organized.", icon: ShieldCheck },
  { title: "Better decisions", text: "Use information to decide what needs attention.", icon: LineChart },
  { title: "Investment protection", text: "Improve visibility of stock and business activity.", icon: Package },
  { title: "Freedom", text: "Spend less time at the counter simply to stay informed.", icon: Store },
  { title: "Growth planning", text: "Use what you learn to identify opportunities and plan ahead.", icon: BarChart3 },
];

const steps = [
  ["01", "Record business activity", "Capture the activity that keeps your business moving."],
  ["02", "Keep information organized", "Bring sales, stock, expenses and customer information together."],
  ["03", "See the business position", "Use a clear dashboard view to understand where things stand."],
  ["04", "Identify what needs attention", "Spot questions and priorities before they become surprises."],
  ["05", "Make informed decisions", "Run your business with facts, not guesswork."],
];

const businessTypes = [
  "Pharmacies and chemists",
  "Auto parts and spare parts shops",
  "Hardware businesses",
  "Retail shops",
  "Electronics businesses",
  "Other small and medium businesses",
];

const informationAreas = [
  { title: "Sales", icon: BarChart3 },
  { title: "Stock", icon: Package },
  { title: "Customers", icon: Users },
  { title: "Expenses", icon: Wallet },
  { title: "Performance", icon: LineChart },
  { title: "Reports and attention areas", icon: FileText },
];

export default function BusinessManagementPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GetAxe Business Management System",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: metadata.description,
    brand: { "@type": "Brand", name: "GetAxe Technologies" },
    provider: {
      "@type": "Organization",
      name: "GetAxe Technologies",
      url: "https://getaxekenya.com",
    },
    offers: { "@type": "Offer", availability: "https://schema.org/PreOrder" },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-indigo-950/70 to-slate-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              GetAxe Business Management System
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Know your business. Control your business.{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-purple-400 bg-clip-text text-transparent">
                Grow with confidence.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Get a clear view of sales, stock, expenses, customers and business
              performance from one system, so you can make informed decisions
              even when you are away from the counter.
            </p>
            <p className="mt-5 text-lg font-semibold text-white">
              Know what&apos;s happening in your business — even when you&apos;re not at the counter.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-4 font-bold text-black transition hover:scale-105">
                Watch the Demo <ArrowRight size={18} />
              </a>
              <Link href="/contactus?service=business-management" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-bold transition hover:bg-white/10">
                Request a Demo <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Visibility", "Know what is happening"],
              ["Control", "Keep information organized"],
              ["Information", "See the business position"],
              ["Decisions", "Act with more confidence"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="font-bold text-[var(--color-accent)]">{title}</p>
                <p className="mt-2 text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-bold uppercase tracking-wider text-indigo-600">The owner&apos;s reality</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Are you really in control of your business?</h2>
            <p className="mt-5 leading-7 text-slate-600">
              Many owners spend valuable time chasing information across notebooks,
              spreadsheets and conversations. The system is built to give you a
              clearer starting point for understanding what needs attention.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Not knowing the actual stock position",
              "Finding out late that fast-moving products are running out",
              "Sales information scattered across different records",
              "Spending without a clear picture of performance",
              "Depending on someone at the counter to explain what happened",
              "Making decisions from assumptions instead of reliable information",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6">
                <CheckCircle2 className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-bold uppercase tracking-wider text-[var(--color-accent)]">What this gives you</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A clearer way to run your business.</h2>
            <p className="mt-5 leading-7 text-slate-300">Get the information you need to stay organized, respond quickly and make better day-to-day decisions.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Icon className="text-[var(--color-accent)]" size={28} />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/70 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-wider text-[var(--color-accent)]">How it works</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A simple path from activity to insight.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {steps.map(([number, title, text]) => (
              <div key={number} className="rounded-2xl border border-white/10 bg-slate-950 p-5">
                <span className="text-3xl font-bold text-[var(--color-accent)]">{number}</span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-bold uppercase tracking-wider text-indigo-600">Built for different businesses</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Your workflow comes first.</h2>
              <p className="mt-5 leading-7 text-slate-600">The exact workflow can be demonstrated according to your business, whether you are running a shop, a pharmacy or a growing operation.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {businessTypes.map((business) => <div key={business} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"><Store size={18} className="text-indigo-600" /><span>{business}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-wider text-[var(--color-accent)]">A clearer view</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Everything you need to see your business clearly.</h2>
          <p className="mt-5 max-w-3xl leading-7 text-slate-300">Keep the information that matters to your business organized and easy to understand.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {informationAreas.map(({ title, icon: Icon }) => <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"><Icon className="shrink-0 text-[var(--color-accent)]" size={26} /><h3 className="font-bold">{title}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-950 to-slate-950 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-bold uppercase tracking-wider text-[var(--color-accent)]">Why GetAxe</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">More than software. A technology partner.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">GetAxe Technologies provides ICT and digital solutions for businesses and institutions. The Business Management System is part of that broader technology offering, supported by a team you can talk to.</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contactus?service=business-management" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-4 font-bold text-black">Request a Demo <ArrowRight size={18} /></Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-green-400/50 px-7 py-4 font-bold text-green-300"><MessageCircle size={18} /> WhatsApp GetAxe</a>
            <a href="tel:+254736889880" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-bold"><Phone size={18} /> Call +254 736 889 880</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
