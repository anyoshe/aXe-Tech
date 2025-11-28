"use client";

import { motion, Variants } from "framer-motion";
import {
  Palette,
  PenTool,
  Code2,
  Megaphone,
} from "lucide-react";
import Image from "next/image";

// ------------------------------------------------------
// DIGITAL SERVICES DATA
// ------------------------------------------------------
const digitalServices = [
  {
    id: "branding",
    title: "Branding",
    icon: <Palette size={32} className="text-[var(--color-accent)]" />,
    description:
      "We create clean, modern brand identities that communicate value, build trust, and position you competitively across all touchpoints.",
    image: "/samples/brand3.jpg",
  },
  {
    id: "designing",
    title: "Designing (UI/UX + Graphics)",
    icon: <PenTool size={32} className="text-[var(--color-accent)]" />,
    description:
      "High-quality UI/UX, design systems, graphics, dashboards, and digital assets that power intuitive and visually consistent experiences.",
    image: "/samples/uiuxgaphic.jpg",
  },
  {
    id: "development",
    title: "Web Development",
    icon: <Code2 size={32} className="text-[var(--color-accent)]" />,
    description:
      "Fast, secure, SEO-optimized websites and apps built for performance, business growth, and long-term reliability.",
    image: "/samples/webdevelopment.jpg",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: <Megaphone size={32} className="text-[var(--color-accent)]" />,
    description:
      "Marketing and growth services focused on conversions — including ads, content strategy, SEO, and full lead generation funnels.",
    image: "/samples/marketing.jpg",
  },
];

// ------------------------------------------------------
// ANIMATIONS
// ------------------------------------------------------
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

// ------------------------------------------------------
// PAGE
// ------------------------------------------------------
export default function DigitalServicesPage() {
  return (
    <section className="py-24 bg-[var(--color-bg-dark)] text-center relative">

      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br 
        from-[var(--color-primary)] via-transparent to-[var(--color-bg-dark)] 
        opacity-10 pointer-events-none"
      />

      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-4 mb-16 relative z-10">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
          className="text-4xl md:text-5xl font-bold text-[var(--color-text-main)] mb-6"
        >
          Digital, Branding & Creative Services
        </motion.h1>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={1}
          className="text-lg md:text-xl text-[var(--color-text-subtle)] leading-relaxed"
        >
          Complete digital transformation services to strengthen your brand, 
          modernize your customer experience, and accelerate growth.
        </motion.p>
      </div>

      {/* DIGITAL SERVICE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 relative z-10">
        {digitalServices.map((service, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={i + 10}
            className="bg-[var(--color-primary)] rounded-2xl overflow-hidden
            shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="relative w-full h-48">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {service.icon}
                <h3
                  className="text-xl font-semibold text-[var(--color-text-main)]
                  group-hover:text-[var(--color-accent)] transition"
                >
                  {service.title}
                </h3>
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                {service.description}
              </p>

              <a
                href={`/${service.id}`}
                className="text-sm text-[var(--color-accent)] font-semibold opacity-0
                group-hover:opacity-100 transition-opacity duration-300"
              >
                Learn more →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
