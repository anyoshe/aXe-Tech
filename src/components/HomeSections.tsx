"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Monitor,
  Network,
  LayoutDashboard,
  Wrench,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const WA = "https://wa.me/254736889880";

const pillars = [
  {
    title: "Equip",
    subtitle: "ICT Supply",
    href: "/shop",
    icon: Monitor,
    text: "Laptops, desktops, printers and accessories — tested and ready for schools and offices.",
  },
  {
    title: "Connect",
    subtitle: "Labs & Network",
    href: "/computer-lab-setup",
    icon: Network,
    text: "Permanent and mobile computer labs, structured cabling and reliable connectivity.",
  },
  {
    title: "Run",
    subtitle: "Software & ERP",
    href: "/software",
    icon: LayoutDashboard,
    text: "School ERP and business management — pick the system that matches your organisation.",
  },
  {
    title: "Support",
    subtitle: "Maintain & Grow",
    href: "/it-support",
    icon: Wrench,
    text: "Repairs, upgrades, maintenance and digital services when you need to grow online.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Assess",
    text: "We understand your school or business needs and constraints.",
  },
  {
    step: "02",
    title: "Quote",
    text: "Clear options for hardware, setup and software — no guesswork.",
  },
  {
    step: "03",
    title: "Deliver & install",
    text: "Supply, configuration and handover so teams can start using the tech.",
  },
  {
    step: "04",
    title: "Support",
    text: "Ongoing help, repairs and upgrades as you scale.",
  },
];

type Product = {
  id: string;
  title: string;
  price: number;
  short?: string;
  images?: string[];
  category?: string;
};

export function TrustBar() {
  const items = [
    "Kenya-based ICT partner",
    "Schools & SMEs",
    "Supply · Setup · Support",
    "WhatsApp response",
  ];
  return (
    <div className="bg-[var(--color-bg-dark)] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {items.map((t) => (
          <span
            key={t}
            className="text-xs sm:text-sm text-white/70 inline-flex items-center gap-2"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomePillars() {
  return (
    <section id="solutions" className="bg-white text-[var(--color-bg-dark)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
            How we help
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            One partner. Four clear pillars.
          </h2>
          <p className="mt-3 text-black/60">
            From devices on desks to systems that run your institution — aligned
            so you always know the next step.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={p.href}
                className="h-full flex flex-col rounded-2xl border border-black/8 bg-zinc-50 p-5 hover:border-[var(--color-primary)]/40 hover:shadow-lg transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide">
                  {p.title}
                </p>
                <h3 className="mt-1 text-lg font-bold">{p.subtitle}</h3>
                <p className="mt-2 text-sm text-black/60 flex-1">{p.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(async (r) => {
        const data = await r.json();
        if (Array.isArray(data)) setProducts(data.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-zinc-50 text-[var(--color-bg-dark)] py-16 md:py-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
              ICT products
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Ready for schools and offices
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]"
          >
            View full catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <p className="text-black/50 text-sm">Loading products…</p>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-8 text-center">
            <p className="text-black/60 text-sm mb-3">
              Catalog is connecting — browse the shop or ask for a quote.
            </p>
            <Link
              href="/shop"
              className="text-[var(--color-primary)] font-semibold text-sm"
            >
              Open shop →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => {
              const img = p.images?.[0] || "/samples/hardwaredisplay.jpg";
              return (
                <Link
                  key={p.id}
                  href={`/ict-products/${p.id}`}
                  className="rounded-2xl bg-white border border-black/8 overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="relative h-40 bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-black/45">{p.category || "ICT"}</p>
                    <h3 className="font-semibold text-sm mt-0.5 line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-bold text-[var(--color-primary)]">
                      KSh {Number(p.price).toLocaleString("en-KE")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export function ErpHighlight() {
  return (
    <section className="bg-[var(--color-bg-dark)] text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider">
            School ERP
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">
            Run admissions, fees and academics in one system.
          </h2>
          <p className="mt-4 text-white/65 leading-relaxed">
            Built for Kenyan schools — students, staff, invoicing and reporting
            with training and support included when you roll out.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/80">
            {[
              "Students, classes and staff records",
              "Fees and invoices",
              "Assignments and operations visibility",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/software"
              className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-3 text-sm hover:brightness-110"
            >
              View all software
            </Link>
            <Link
              href="/school-erp/demo"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
            >
              School ERP demo
            </Link>
            <Link
              href="/business-management"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/5"
            >
              Business system
            </Link>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-white/5">
          <Image
            src="/samples/ERp.jpg"
            alt="School ERP"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="bg-white text-[var(--color-bg-dark)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
            How we work
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            Clear process. Reliable delivery.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-2xl border border-black/8 p-5 bg-zinc-50"
            >
              <span className="text-2xl font-bold text-[var(--color-accent)]">
                {s.step}
              </span>
              <h3 className="mt-2 font-bold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-black/60">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[var(--color-primary)] text-white font-semibold px-5 py-3 text-sm hover:bg-[var(--color-primary-hover)]"
          >
            WhatsApp a quote
          </a>
          <Link
            href="/contactus"
            className="rounded-xl border border-black/15 font-semibold px-5 py-3 text-sm hover:bg-zinc-50"
          >
            Contact form
          </Link>
        </div>
      </div>
    </section>
  );
}
