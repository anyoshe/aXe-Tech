"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const WA = "https://wa.me/254736889880";
const PHONE = "tel:+254736889880";

const solutions = [
  {
    label: "Software & ERP",
    href: "/software",
    description: "School ERP and business management systems",
  },
  {
    label: "Labs & Infrastructure",
    href: "/computer-lab-setup",
    description: "Permanent & mobile computer labs, networking",
  },
  {
    label: "Mobile Labs",
    href: "/mobile-lab",
    description: "Portable ICT labs for schools",
  },
  {
    label: "Networking",
    href: "/networking",
    description: "Structured cabling, Wi‑Fi & connectivity",
  },
  {
    label: "IT Support & Repair",
    href: "/it-support",
    description: "Maintenance, upgrades and support",
  },
  {
    label: "Digital Services",
    href: "/digital-services",
    description: "Web, branding and growth (add‑on suite)",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Ignore clicks inside any Solutions control/menu (desktop + mobile)
      if (target?.closest?.("[data-solutions-menu]")) return;
      setSolutionsOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const linkClass =
    "text-sm font-medium text-white/85 hover:text-[var(--color-accent)] transition-colors";

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-[var(--color-bg-dark)]/95 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
          : "bg-[var(--color-bg-dark)]/80 backdrop-blur-md border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="relative h-8 w-[130px] shrink-0">
            <Image
              src="/getaxelogobkgd.svg"
              alt="GetAxe Kenya"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            <div className="relative" ref={dropRef} data-solutions-menu>
              <button
                type="button"
                className={clsx(linkClass, "inline-flex items-center gap-1")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSolutionsOpen((v) => !v);
                }}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDown
                  className={clsx(
                    "w-4 h-4 transition-transform",
                    solutionsOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-3 w-[340px]"
                  >
                    <div className="rounded-xl border border-white/10 bg-[var(--color-bg-dark)] shadow-2xl p-2">
                      {solutions.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block rounded-lg px-3 py-2.5 hover:bg-white/5"
                          onClick={() => setSolutionsOpen(false)}
                        >
                          <span className="text-sm font-medium text-white">
                            {s.label}
                          </span>
                          <span className="block text-xs text-white/50 mt-0.5">
                            {s.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/shop" className={linkClass}>
              Products
            </Link>
            <Link href="/software" className={linkClass}>
              Software
            </Link>
            <Link href="/partners" className={linkClass}>
              Partners
            </Link>
            <Link href="/portfolios" className={linkClass}>
              Projects
            </Link>
            <Link href="/contactus" className={linkClass}>
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={PHONE}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              +254 736 889 880
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] text-sm font-semibold px-3.5 py-2 hover:brightness-110 transition"
            >
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-white"
            onClick={() => {
              setOpen((v) => {
                if (v) setSolutionsOpen(false);
                return !v;
              });
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-[var(--color-bg-dark)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              <div data-solutions-menu>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSolutionsOpen((v) => !v);
                }}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/5"
              >
                <span>Solutions</span>
                <ChevronDown
                  className={clsx(
                    "w-4 h-4 text-white/50 transition-transform",
                    solutionsOpen && "rotate-180"
                  )}
                />
              </button>
              {solutionsOpen && (
                <div className="ml-2 border-l border-white/10 pl-2 space-y-0.5 mb-1">
                  {solutions.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => {
                        setOpen(false);
                        setSolutionsOpen(false);
                      }}
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                    >
                      <span className="font-medium text-white/95">{s.label}</span>
                      {s.description && (
                        <span className="block text-xs text-white/40 mt-0.5">{s.description}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
              </div>
              <div className="h-px bg-white/10 my-2" />
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white"
              >
                Products
              </Link>
              <Link
                href="/software"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white"
              >
                Software
              </Link>
              <Link
                href="/partners"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white"
              >
                Partners
              </Link>
              <Link
                href="/portfolios"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white"
              >
                Projects
              </Link>
              <Link
                href="/contactus"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white"
              >
                Contact
              </Link>
              <div className="pt-3 flex flex-col gap-2">
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold py-2.5 text-sm"
                >
                  WhatsApp us
                </a>
                <a
                  href={PHONE}
                  className="text-center text-sm text-white/70 py-1"
                >
                  Call +254 736 889 880
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
