"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const WA =
  "https://wa.me/254736889880?text=Hello%20GetAxe%2C%20I%20need%20an%20ICT%20solution.";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-16 text-white overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.45]"
      >
        <source src="/samples/bgvd.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--color-bg-dark)]/70 via-transparent to-[var(--color-bg-dark)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[var(--color-accent)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
        >
          Kenya · ICT supply · Labs · Software · Support
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-3xl"
        >
          ICT that works for Kenyan schools and businesses.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-5 h-1 w-16 rounded-full bg-[var(--color-accent)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed"
        >
          Devices, computer labs, networking, and school systems — supplied, set
          up, and supported. One partner from hardware to software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
        >
          <Link
            href="/shop"
            className="inline-flex justify-center items-center rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-dark)] font-semibold px-6 py-3.5 text-sm sm:text-base hover:brightness-110 transition shadow-lg shadow-black/20"
          >
            Browse ICT products
          </Link>
          <Link
            href="/contactus"
            className="inline-flex justify-center items-center rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm font-semibold px-6 py-3.5 text-sm sm:text-base hover:bg-white/10 transition"
          >
            Request a solution
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center rounded-xl text-white/80 font-medium px-4 py-3.5 text-sm hover:text-[var(--color-accent)] transition"
          >
            Or chat on WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
