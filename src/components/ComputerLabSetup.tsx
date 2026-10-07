"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  Phone,
  Wrench,
  Monitor,
  Network,
  GraduationCap,
  ClipboardList,
  ArrowRight,
  Home,
  MessageCircle,
} from "lucide-react";

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20a%20quotation%20for%20a%20permanent%20computer%20lab.";
const PHONE = "tel:+254736889880";

const process = [
  {
    step: "01",
    title: "Site survey & design",
    desc: "We assess power, space, security and teaching goals, then propose a practical lab layout.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Supply & install",
    desc: "Workstations, networking, cabling and classroom setup — configured and tested before handover.",
    icon: Monitor,
  },
  {
    step: "03",
    title: "Train & launch",
    desc: "Teachers and lab managers get hands-on orientation so the room is used from day one.",
    icon: GraduationCap,
  },
  {
    step: "04",
    title: "Support & scale",
    desc: "Maintenance, upgrades and expansion paths as enrolment or programmes grow.",
    icon: Wrench,
  },
];

const packages = [
  {
    name: "Starter lab",
    seats: "About 20 seats",
    forWho: "Primary / small secondary",
    features: [
      "Workstation package sized to your room",
      "Local networking & shared access",
      "Basic teacher station setup",
      "Handover checklist & orientation",
    ],
  },
  {
    name: "Standard lab",
    seats: "About 40 seats",
    forWho: "Secondary schools & centres",
    features: [
      "Full class seating plan",
      "Structured cabling & Wi‑Fi as needed",
      "Projection / display options",
      "Teacher training session",
    ],
    popular: true,
  },
  {
    name: "Campus / multi-room",
    seats: "Multiple rooms",
    forWho: "Larger schools & institutions",
    features: [
      "Multi-lab design",
      "Backbone networking options",
      "Central management approach",
      "Phased rollout & SLA-style support options",
    ],
  },
];

const trustPoints = [
  {
    title: "One accountable partner",
    text: "Hardware, network and setup under one team — fewer vendors to chase when something fails.",
  },
  {
    title: "Built for Kenyan schools",
    text: "We plan for power realities, security, class sizes and the way labs are actually taught.",
  },
  {
    title: "Clear quotation",
    text: "You get a written scope: seats, network, install and training — no vague “from” price banners.",
  },
  {
    title: "After go-live support",
    text: "Repairs, upgrades and advice so the lab stays usable beyond installation day.",
  },
];

const faqs = [
  {
    q: "How do we get a price?",
    a: "We quote after understanding seat count, room condition, power and whether networking is included. Contact us or WhatsApp for a tailored quotation.",
  },
  {
    q: "How long does a typical install take?",
    a: "Depends on procurement and room readiness. After equipment is on site, many starter labs complete within a few weeks — we confirm timelines in your proposal.",
  },
  {
    q: "Do you train teachers?",
    a: "Yes. Orientation for teachers and lab managers is part of a proper handover, not an optional extra we forget.",
  },
  {
    q: "Can you use equipment we already have?",
    a: "Often yes. We can audit existing PCs and design a hybrid lab that fills gaps instead of replacing everything.",
  },
];

export default function ComputerLabSetupPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-dark)] text-white">
      {/* Breadcrumb / back to home */}
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
          <span className="text-white">Computer lab setup</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] mb-4">
              <Shield className="w-3.5 h-3.5" />
              Permanent computer labs · Schools & institutions
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Computer labs that are ready to teach on day one.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              GetAxe designs, supplies and installs permanent ICT labs — workstations,
              networking and handover — so your school is not left with boxes and no
              working classroom.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110"
              >
                <MessageCircle className="w-4 h-4" />
                Request lab quotation
              </a>
              <Link
                href="/contactus?service=computer-lab"
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
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Site survey first
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Written quotation
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Training on handover
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/samples/computerlab.jpg"
              alt="School computer lab setup by GetAxe"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 p-4">
              <p className="text-sm font-medium">From empty room to teaching lab</p>
              <p className="text-xs text-white/60 mt-1">
                Layout · power awareness · network · devices · teacher orientation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why trust */}
      <section className="border-t border-white/10 bg-black/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Why schools work with GetAxe</h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            You are not buying machines only — you are buying a lab that must work for
            real classes, real teachers and real maintenance constraints.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-semibold text-[var(--color-accent)]">{t.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How a lab project runs</h2>
          <p className="text-white/60 mb-10 max-w-2xl">
            A simple, accountable process so parents, boards and administrators know what happens next.
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

      {/* Packages — no prices */}
      <section className="py-14 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Lab scopes we commonly deliver</h2>
          <p className="text-white/60 mb-10 max-w-2xl">
            Packages are starting points. Final scope and quotation depend on your room, power and teaching goals.
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
                <p className="text-sm text-white/50 mt-1">{pkg.seats}</p>
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

      {/* Related */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold mb-4 text-white/80">Related solutions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mobile-lab"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
            >
              Mobile computer labs
            </Link>
            <Link
              href="/networking"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
            >
              Networking
            </Link>
            <Link
              href="/shop"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
            >
              ICT products
            </Link>
            <Link
              href="/school-erp"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
            >
              School ERP
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 border-t border-white/10 bg-black/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Questions schools ask</h2>
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

      {/* Final CTA */}
      <section className="py-14 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Network className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to plan your lab?
          </h2>
          <p className="mt-3 text-white/65">
            Tell us seat count and location — we will respond with next steps and a quotation.
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
