"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  Phone,
  Wrench,
  Monitor,
  HardDrive,
  Home,
  MessageCircle,
  Clock,
  Headphones,
} from "lucide-react";

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20IT%20support%20%2F%20a%20quotation.";
const PHONE = "tel:+254736889880";

const services = [
  {
    title: "Device repair & upgrades",
    text: "Laptops, desktops and peripherals — diagnosis, parts guidance, SSD/RAM upgrades where it makes sense.",
    icon: Wrench,
  },
  {
    title: "Setup & configuration",
    text: "New PCs, software installs, data moves and handovers so staff can work the same day.",
    icon: Monitor,
  },
  {
    title: "Maintenance plans",
    text: "Scheduled checkups for offices and school labs — fewer surprise failures during term or peak season.",
    icon: Clock,
  },
  {
    title: "Remote & on-site help",
    text: "Quick remote assistance when possible; on-site when the job needs hands on hardware.",
    icon: Headphones,
  },
];

const process = [
  { step: "01", title: "Tell us the issue", desc: "Device type, symptoms, urgency and location." },
  { step: "02", title: "Assess", desc: "Remote triage or on-site inspection — honest options before work starts." },
  { step: "03", title: "Quote & approve", desc: "Clear scope for repair, parts or plan — no surprise invoices." },
  { step: "04", title: "Fix & hand back", desc: "Work done, tested, and explained in plain language." },
];

const faqs = [
  {
    q: "Do you publish repair prices?",
    a: "No fixed public list — cost depends on diagnosis and parts. You get a quotation before we proceed beyond assessment.",
  },
  {
    q: "Can you support a whole office or lab?",
    a: "Yes. We support single devices and ongoing arrangements for teams and school labs.",
  },
  {
    q: "Is this the same as buying new equipment?",
    a: "Support keeps what you have running. When replacement is smarter, we say so and can supply from our ICT catalogue.",
  },
];

export default function ITSupportPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-dark)] text-white">
      <div className="border-b border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/80 hover:text-[var(--color-accent)]">
            <Home className="w-4 h-4" /> Home
          </Link>
          <span className="text-white/30">/</span>
          <Link href="/#solutions" className="hover:text-[var(--color-accent)]">Solutions</Link>
          <span className="text-white/30">/</span>
          <span className="text-white">IT support</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] mb-4">
            <Shield className="w-3.5 h-3.5" />
            IT support · Repair · Maintenance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Keep devices and teams working — without the runaround.
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
            GetAxe handles repairs, setups and practical IT support for schools and
            businesses. Clear assessment, quotation where needed, and work you can trust.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110">
              <MessageCircle className="w-4 h-4" /> WhatsApp support
            </a>
            <Link href="/contactus?service=it-support"
              className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5">
              Request a call
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[var(--color-accent)] px-2 py-3">
              ← Back to home
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
          <Image src="/samples/computer repair.jpg" alt="IT support and computer repair" fill className="object-cover" sizes="50vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 border border-white/10 p-4 text-sm">
            Diagnosis · Repair · Upgrades · Lab & office maintenance
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What we support</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <s.icon className="w-5 h-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-accent)]">{s.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How a job runs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((s) => (
              <div key={s.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="text-[var(--color-accent)] font-bold">{s.step}</span>
                <h3 className="font-semibold mt-2">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold mb-4 text-white/80">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">ICT products</Link>
            <Link href="/networking" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">Networking</Link>
            <Link href="/computer-lab-setup" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">Computer labs</Link>
            <Link href="/digital-services" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">Digital services</Link>
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
        <HardDrive className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Need help with a device or site?</h2>
        <p className="mt-2 text-white/65 max-w-lg mx-auto">Describe the problem — we will guide the next step and quote when work is required.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3 text-sm">WhatsApp GetAxe</a>
          <a href={PHONE} className="rounded-xl border border-white/20 font-semibold px-6 py-3 text-sm inline-flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> +254 736 889 880</a>
          <Link href="/" className="rounded-xl text-sm text-white/70 hover:text-[var(--color-accent)] px-6 py-3 inline-flex items-center justify-center gap-1"><Home className="w-4 h-4" /> Home</Link>
        </div>
      </section>
    </div>
  );
}
