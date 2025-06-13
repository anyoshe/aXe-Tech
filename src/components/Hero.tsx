"use client";
import { useState } from "react";
// import Link from 'next/link';
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "../../styles/Hero.module.css";


const textFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut", // <- Use a string here, not an array
    },
  }),
};


export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`${styles.heroSection} w-full min-h-screen flex flex-col md:flex-row items-start text-center md:text-left relative`}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.5] md:brightness-[0.6]"
      >
        <source src="/samples/bgvd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* LOGO & MENU */}
      <div className={`${styles.logoContainer} flex justify-between items-center z-20 relative`}>
        <div className={styles.logoBox}>
          <img
            src="/axe-Tech.svg"
            alt="aXe-Tech logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>

        <div className={styles.hamburgerBox}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[var(--color-text-main)] rounded-md transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full right-0 mt-2 w-[90vw] sm:w-[280px] bg-black bg-opacity-90 text-[var(--color-text-main)] rounded-lg shadow-lg p-6 space-y-4 z-40"
            >
              <a href="#" className="block hover:underline">Home</a>
              <a href="#projects" className="block hover:underline">What We Do</a>
              <a href="#contact" className="block hover:underline">Contact Us</a>
              <a href="/digital-talk" className="block hover:underline">Digital Talk</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* HERO CONTENT */}
      <motion.div
        className={`${styles.heroContent} z-20`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          className="text-sm md:text-base mb-4 text-[var(--color-accent)] uppercase tracking-wide"
          variants={textFade}
          custom={0}
        >
          Trusted, Results-Driven Digital Partner
        </motion.p>

        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl leading-tight text-[var(--color-text-main)]"
          variants={textFade}
          custom={1}
        >
          Your Business Deserves More Than Just Being Online
        </motion.h1>
        <hr className="w-20 h-2 bg-[var(--color-accent)] mb-6 mx-auto md:mx-0" />
        <motion.p
          className="text-lg md:text-xl mb-4 max-w-2xl text-[var(--color-text-subtle)]"
          variants={textFade}
          custom={2}
        >
          We believe every brand — startup or established — deserves real value
          from its digital presence. That’s why we don’t just build websites; we
          create results. Whether it’s branding, design, development, or marketing —
          we’re here to help you thrive online.
        </motion.p>

        <motion.div
          className="w-full flex justify-center md:justify-start mt-6"
          variants={textFade}
          custom={4}
        >
          <motion.a
            href="#contact"
            className={`ctaButton px-12 py-3 bg-[var(--color-primary)] text-[var(--color-text-main)] rounded-half font-medium hover:bg-[var(--color-primary-hover)] transition`}
          >
            Let’s Talk
          </motion.a>
        </motion.div>
      </motion.div>
      {/* Scroll to Top Arrow */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-15 right-6 z-50 p-3 rounded-full bg-[var(--color-primary)] text-white shadow-lg hover:bg-[var(--color-primary-hover)] transition duration-300"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

    </section>

  );
}
