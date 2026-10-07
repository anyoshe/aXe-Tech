"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  Phone,
  Truck,
  Laptop,
  GraduationCap,
  Calendar,
  Home,
  MessageCircle,
  MapPin,
} from "lucide-react";

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20a%20quotation%20for%20mobile%20computer%20lab%20sessions.";
const PHONE = "tel:+254736889880";

const process = [
  {
    step: "01",
    title: "Schedule & plan",
    desc: "Agree dates, class size, subjects and power/security on site.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "We bring the lab",
    desc: "Charged devices, network kit and learning setup arrive ready for class.",
    icon: Truck,
  },
  {
    step: "03",
    title: "Teach & support",
    desc: "Sessions run with facilitation support so teachers are not left alone with the tech.",
    icon: GraduationCap,
  },
  {
    step: "04",
    title: "Report & continue",
    desc: "Feedback after sessions; scale frequency or move toward a permanent lab when ready.",
    icon: Laptop,
  },
];

const packages = [
  {
    name: "Trial sessions",
    forWho: "Schools testing digital learning",
    features: [
      "Limited session block to pilot",
      "Devices & basic connectivity",
      "Orientation for teachers",
      "Written quotation for ongoing plan",
    ],
  },
  {
    name: "Term programme",
    forWho: "Regular weekly or bi-weekly classes",
    features: [
      "Scheduled visits through the term",
      "Curriculum-aligned session planning",
      "Consistent device set",
      "Priority scheduling",
    ],
    popular: true,
  },
  {
    name: "Intensive / camp",
    forWho: "Holiday camps & short courses",
    features: [
      "Multi-day concentrated delivery",
      "Higher seat counts where feasible",
      "Custom skill focus (coding, office, exams)",
      "Combined quote with materials if needed",
    ],
  },
];

const trustPoints = [
  {
    title: "No heavy capital first",
    text: "Start digital skills without funding a full permanent lab on day one.",
  },
  {
    title: "We handle the fleet",
    text: "Devices, charge state and basic network — less burden on school IT capacity.",
  },
  {
    title: "Fits real timetables",
    text: "Sessions planned around your calendar, not a one-size product brochure.",
  },
  {
    title: "Path to permanent lab",
    text: "When you are ready, we can design a fixed lab using what you learned from mobile sessions.",
  },
];

const faqs = [
  {
    q: "How is this different from a permanent lab?",
    a: "Mobile labs come to you for booked sessions. Permanent labs stay on campus. Many schools use mobile first, then invest in a fixed lab.",
  },
  {
    q: "What do we need on site?",
    a: "A safe room, power access and a contact person. We confirm requirements during quotation.",
  },
  {
    q: "How do we get pricing?",
    a: "Pricing depends on sessions per month, travel distance and class size. We send a clear quotation — no public rate card.",
  },
  {
    q: "Can teachers be trained?",
    a: "Yes. Orientation and co-facilitation options are part of how we deliver, not an afterthought.",
  },
];

export default function MobileLabPage() {
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
          <span className="text-white">Mobile computer labs</span>
        </div>
      </div>

      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)] mb-4">
              <Shield className="w-3.5 h-3.5" />
              Mobile ICT labs · Schools & programmes
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Bring a working computer class to your school.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              GetAxe mobile labs deliver scheduled digital learning sessions with devices
              and support — so learners practice real ICT skills without waiting for a
              full permanent lab budget.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110"
              >
                <MessageCircle className="w-4 h-4" />
                Request session quotation
              </a>
              <Link
                href="/contactus?service=mobile-lab"
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
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Scheduled visits
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Devices included
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Quotation-based
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/samples/mobilecomputerlab.jpg"
              alt="Mobile computer lab for schools"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 p-4">
              <p className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                We come to your campus
              </p>
              <p className="text-xs text-white/60 mt-1">
                Sessions · devices · facilitation support · path to permanent lab
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Why schools choose mobile labs</h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            Practical ICT access while you plan or fund a permanent facility.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How it works</h2>
          <p className="text-white/60 mb-10 max-w-2xl">
            From first call to classroom sessions — clear steps, one partner.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Programme shapes</h2>
          <p className="text-white/60 mb-10 max-w-2xl">
            We quote on session count, location and class size — not a one-line public price.
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

      <section className="py-14 border-t border-white/10 bg-black/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Questions schools ask</h2>
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
          <Truck className="w-10 h-10 text-[var(--color-primary)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold">Plan your first mobile lab visit</h2>
          <p className="mt-3 text-white/65">
            Share location, class size and preferred dates — we will respond with options and a quotation.
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
