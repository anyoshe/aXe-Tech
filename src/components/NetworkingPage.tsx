"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  Phone,
  Wifi,
  Cable,
  Server,
  ClipboardList,
  Home,
  MessageCircle,
  Router,
} from "lucide-react";

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20a%20quotation%20for%20networking%20%2F%20Wi-Fi%20setup.";
const PHONE = "tel:+254736889880";

const process = [
  {
    step: "01",
    title: "Survey & design",
    desc: "Walk the site, map coverage, cabling routes and security needs.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Supply & install",
    desc: "Structured cabling, switches, access points and core links — installed cleanly.",
    icon: Cable,
  },
  {
    step: "03",
    title: "Configure & secure",
    desc: "SSIDs, passwords, segmentation where needed, and basic hardening.",
    icon: Router,
  },
  {
    step: "04",
    title: "Handover & support",
    desc: "Documentation, admin access and optional maintenance so the network stays usable.",
    icon: Server,
  },
];

const packages = [
  {
    name: "Small office / SME",
    forWho: "Offices, clinics, small shops",
    features: [
      "Reliable LAN / Wi‑Fi design",
      "Router & access point setup",
      "Basic security practices",
      "User handover",
    ],
  },
  {
    name: "School / multi-room",
    forWho: "Labs, admin blocks, campuses",
    features: [
      "Coverage for teaching and admin",
      "Structured cabling options",
      "Shared lab and staff networks",
      "Aligned with computer lab projects",
    ],
    popular: true,
  },
  {
    name: "Campus / advanced",
    forWho: "Larger sites & multi-building",
    features: [
      "Backbone and distribution design",
      "Scalable access layer",
      "Monitoring / upgrade path",
      "Phased rollout possible",
    ],
  },
];

const trustPoints = [
  {
    title: "Designed for how you work",
    text: "Classrooms, offices and labs need stable access — not just a consumer router in a corner.",
  },
  {
    title: "Clean install",
    text: "Cabling and placement done so maintenance is possible and the site stays professional.",
  },
  {
    title: "Quoted after survey",
    text: "Distance, walls, power and user count change cost. We quote the real job.",
  },
  {
    title: "Works with our labs",
    text: "Same team can align network design with permanent or mobile computer lab projects.",
  },
];

const faqs = [
  {
    q: "Do you only sell equipment?",
    a: "We can supply hardware, but the value is design, install and a network that works for your users. Quotation covers the full scope you choose.",
  },
  {
    q: "Can you improve an existing network?",
    a: "Yes. We assess what is already there and recommend upgrades instead of always starting from zero.",
  },
  {
    q: "How do we get a price?",
    a: "After a short discovery or site survey. Public fixed packages rarely match real buildings — we quote per site.",
  },
  {
    q: "Do you support after installation?",
    a: "Handover includes basics; ongoing support can be included in your quotation or tied to IT support plans.",
  },
];

export default function NetworkingPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-dark)] text-white">
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
          <Link href="/#solutions" className="hover:text-[var(--color-accent)] transition">
            Solutions
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">Networking</span>
        </div>
      </div>

      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] mb-4">
              <Shield className="w-3.5 h-3.5" />
              Networking · Schools & businesses
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Networks that stay up when classes and work depend on them.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              GetAxe designs and installs LAN and Wi‑Fi for schools, offices and ICT labs —
              structured cabling, access points and configuration with a clear quotation
              after we understand your site.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110"
              >
                <MessageCircle className="w-4 h-4" />
                Request network quotation
              </a>
              <Link
                href="/contactus?service=networking"
                className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
              >
                Book a consultation
              </Link>
              <Link
                href="/"
                className="inline-flex justify-center items-center gap-2 text-sm text-white/60 hover:text-[var(--color-accent)] px-2 py-3"
              >
                ← Back to home
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Site survey
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Cabling & Wi‑Fi
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Documented handover
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/samples/network.jpg"
              alt="Networking and Wi-Fi installation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 p-4">
              <p className="text-sm font-medium flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[var(--color-accent)]" />
                Coverage where people actually work
              </p>
              <p className="text-xs text-white/60 mt-1">
                Survey · install · configure · support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Why clients trust GetAxe networking</h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            Connectivity is infrastructure. It should be planned, not guessed.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((t) => (
              <div key={t.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-[var(--color-accent)]">{t.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How a network project runs</h2>
          <p className="text-white/60 mb-10 max-w-2xl">
            Transparent steps from first visit to a network your team can use.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[var(--color-accent)] font-bold text-lg">{s.step}</span>
                  <s.icon className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Typical project scopes</h2>
          <p className="text-white/60 mb-10 max-w-2xl">
            Starting points only — your quotation reflects the real building and user load.
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
          <h2 className="text-lg font-semibold mb-4 text-white/80">Related solutions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/computer-lab-setup"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
            >
              Permanent computer labs
            </Link>
            <Link
              href="/mobile-lab"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
            >
              Mobile labs
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

      <section className="py-14 border-t border-white/10 bg-black/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Questions clients ask</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Wifi className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold">Ready to plan your network?</h2>
          <p className="mt-3 text-white/65">
            Tell us site type and approximate size — we will outline next steps and a quotation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3 text-sm"
            >
              WhatsApp GetAxe
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
    </div>
  );
}
