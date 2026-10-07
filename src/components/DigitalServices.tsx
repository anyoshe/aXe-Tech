"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  Phone,
  Home,
  MessageCircle,
  Palette,
  Globe,
  Megaphone,
  Layout,
} from "lucide-react";

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20a%20quotation%20for%20digital%20services.";
const PHONE = "tel:+254736889880";

/** Distinct from ICT hardware/labs — creative & web only */
const offers = [
  {
    title: "Brand identity",
    text: "Logo systems, colours and basics so your school or business looks consistent offline and online.",
    icon: Palette,
    href: "/branding",
  },
  {
    title: "Websites & landing pages",
    text: "Clear sites that explain who you are and how to reach you — built to load well on mobile.",
    icon: Globe,
    href: "/development",
  },
  {
    title: "UI for products & portals",
    text: "Interfaces for tools your users actually open — aligned with GetAxe software where relevant.",
    icon: Layout,
    href: "/designing",
  },
  {
    title: "Content & visibility",
    text: "Practical content and campaign support when you need to be found — not vanity metrics.",
    icon: Megaphone,
    href: "/marketing",
  },
];

const process = [
  { step: "01", title: "Brief", desc: "Goals, audience and what success looks like." },
  { step: "02", title: "Proposal", desc: "Scope and quotation — no open-ended surprises." },
  { step: "03", title: "Produce", desc: "Design or build with checkpoints you can review." },
  { step: "04", title: "Launch & hand over", desc: "Go live with files, access and plain guidance." },
];

const faqs = [
  {
    q: "Is digital services your main offer?",
    a: "No. GetAxe is primarily an ICT partner — devices, labs, networks and systems. Digital services support that story when you need web, brand or visibility.",
  },
  {
    q: "How is pricing handled?",
    a: "By quotation after the brief. Scope changes the cost; we do not list fixed packages that rarely match real projects.",
  },
  {
    q: "Can this connect to School ERP or business software?",
    a: "Yes when it helps — for example a school site that points parents to the right channels, or a business site that matches your operations brand.",
  },
];

export default function DigitalServicePage() {
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
          <span className="text-white">Digital services</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] mb-4">
            <Shield className="w-3.5 h-3.5" />
            Digital suite · Brand · Web · Visibility
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Look clear online — backed by a real ICT company.
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
            Brand, websites and practical digital work for schools and businesses that
            already trust GetAxe for technology — or are meeting us for the first time online.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110">
              <MessageCircle className="w-4 h-4" /> Request quotation
            </a>
            <Link href="/contactus?service=digital"
              className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5">
              Discuss a project
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[var(--color-accent)] px-2 py-3">
              ← Back to home
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
          <Image src="/samples/ui-ux-nxt-with-laptop.jpg" alt="Digital design and web services" fill className="object-cover" sizes="50vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 border border-white/10 p-4 text-sm">
            Brand · Web · UI · Content — quoted per project
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What we offer</h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            Four focused areas — each can stand alone or combine. Detail pages exist where you need more depth.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {offers.map((o) => (
              <Link
                key={o.title}
                href={o.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-[var(--color-primary)]/40 transition group"
              >
                <o.icon className="w-5 h-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-accent)] group-hover:underline">{o.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{o.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How projects run</h2>
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
          <h2 className="text-lg font-semibold mb-4 text-white/80">Core ICT (our main focus)</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">Products</Link>
            <Link href="/computer-lab-setup" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">Computer labs</Link>
            <Link href="/school-erp" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">School ERP</Link>
            <Link href="/business-management" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">Business management</Link>
            <Link href="/it-support" className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:text-[var(--color-accent)]">IT support</Link>
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
        <h2 className="text-2xl font-bold">Have a brand or web project?</h2>
        <p className="mt-2 text-white/65 max-w-lg mx-auto">Send a short brief — we will reply with fit, timeline sense and a quotation.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3 text-sm">WhatsApp GetAxe</a>
          <a href={PHONE} className="rounded-xl border border-white/20 font-semibold px-6 py-3 text-sm inline-flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> +254 736 889 880</a>
          <Link href="/" className="rounded-xl text-sm text-white/70 hover:text-[var(--color-accent)] px-6 py-3 inline-flex items-center justify-center gap-1"><Home className="w-4 h-4" /> Home</Link>
        </div>
      </section>
    </div>
  );
}
