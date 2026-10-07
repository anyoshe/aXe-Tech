"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Home } from "lucide-react";

type PortfolioItem = {
  title: string;
  image: string;
  link: string;
  description: string;
  status: "Live" | "In production";
  type: string;
  client?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "NeuroFlex Kenya",
    client: "NeuroFlex Kenya",
    image: "/projects/neuroflex-logo.png",
    description:
      "Live organisation website for NeuroFlex Kenya — clear information architecture, modern presentation and a trustworthy public presence for their services.",
    link: "https://neuroflexkenya.com/",
    status: "Live",
    type: "Website · Organisation",
  },
  {
    title: "GetAxe Business Management System",
    client: "GetAxe Technologies",
    image: "/gat-icon.png",
    description:
      "Operations platform for SMEs — sales, stock, expenses and visibility for owners. Deployed at app.getaxekenya.com and offered to Kenyan businesses.",
    link: "https://app.getaxekenya.com/",
    status: "Live",
    type: "Web app · Business software",
  },
  {
    title: "TJ-U Auto",
    client: "TJ-U Auto",
    image: "/projects/tj-logo.png",
    description:
      "Automotive business web presence — product and service oriented layout built for clarity on mobile and desktop.",
    link: "https://tj-u-auto.vercel.app/",
    status: "Live",
    type: "Website · SME",
  },
  {
    title: "GetAxe Kenya — Company site",
    client: "GetAxe Technologies",
    image: "/getaxelogobkgd.svg",
    description:
      "ICT company site for hardware, labs, networking, School ERP and support — the platform you are on now.",
    link: "https://getaxekenya.com/",
    status: "Live",
    type: "Website · ICT company",
  },
  {
    title: "School ERP (demo)",
    client: "GetAxe Technologies",
    image: "/samples/computerlab.jpg",
    description:
      "Interactive school management demo — students, fees, library and operations for Kenyan school presentations and rollouts.",
    link: "/school-erp/demo",
    status: "Live",
    type: "Web app · Education",
  },
  {
    title: "Chama Fund Vault",
    client: "GetAxe Technologies",
    image: "/samples/Saas.jpg",
    description:
      "Digital chama fund tracking for savings groups — contributions and clearer records. Live product from GetAxe.",
    link: "https://chama-fund-vault-pi.vercel.app/",
    status: "Live",
    type: "Web app · Fintech / groups",
  },
  {
    title: "Anyoka Eats",
    client: "Anyoka Eats",
    image: "/samples/my-logo.png",
    description:
      "Food ordering platform with menu browsing and ordering flows — full-stack delivery for a local food business.",
    link: "https://www.anyokaeats.com/",
    status: "Live",
    type: "Web app · E-commerce",
  },
];

export default function Portfolio() {
  return (
    <section
      id="projects"
      className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-main)]"
    >
      <div className="border-b border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-[var(--color-accent)]"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">Projects</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
            Selected work
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
            Projects that shipped
          </h1>
          <p className="mt-4 text-white/65 leading-relaxed">
            Live systems and sites for organisations and businesses — not mock-only
            concepts. Want something similar?{" "}
            <Link href="/contactus" className="text-[var(--color-accent)] hover:underline">
              Request a quotation
            </Link>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => {
            const external = item.link.startsWith("http");
            return (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[var(--color-primary)]/40 transition"
              >
                <div className={`relative w-full h-48 ${item.image.includes("logo") || item.image.endsWith(".svg") || item.image.includes("gat-icon") || item.image.includes("my-logo") ? "bg-white flex items-center justify-center p-6" : "bg-black/40"}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={item.image.includes("logo") || item.image.endsWith(".svg") || item.image.includes("gat-icon") || item.image.includes("my-logo") ? "object-contain p-4" : "object-cover"}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 text-left">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className="text-lg font-semibold text-white leading-snug">
                      {item.title}
                    </h2>
                    <span className="shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-600/90 text-white">
                      {item.status}
                    </span>
                  </div>
                  {item.client && (
                    <p className="text-xs text-white/45 mb-1">{item.client}</p>
                  )}
                  <p className="text-xs font-medium text-[var(--color-accent)] mb-2">
                    {item.type}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <a
                    href={item.link}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    {external ? "Visit live site" : "Open project"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-black/30 p-8 text-center">
          <h2 className="text-xl font-bold">Build the next one with GetAxe</h2>
          <p className="mt-2 text-sm text-white/60 max-w-lg mx-auto">
            Websites, business systems, School ERP and ICT projects — scoped with a clear quotation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20saw%20your%20projects%20and%20want%20a%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-5 py-2.5 text-sm"
            >
              WhatsApp
            </a>
            <Link
              href="/contactus"
              className="rounded-xl border border-white/20 font-semibold px-5 py-2.5 text-sm hover:bg-white/5"
            >
              Contact
            </Link>
            <Link
              href="/"
              className="rounded-xl text-sm text-white/70 hover:text-[var(--color-accent)] px-5 py-2.5"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
