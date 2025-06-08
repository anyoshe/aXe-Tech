"use client";

import { motion } from "framer-motion";
import { PenTool, Palette, Code2, Megaphone } from "lucide-react";


const services = [
  {
    id: "branding",
    title: "Branding",
    icon: <Palette size={32} className="text-[var(--color-accent)]" />,
    description:
      "We help shape strong identities that connect emotionally, stand out visually, and earn long-term customer loyalty.",
    image: "/samples/brand3.jpg",
  },
  {
    id: "designing",
    title: "Designing",
    icon: <PenTool size={32} className="text-[var(--color-accent)]" />,
    description:
      "We design sleek, user-friendly interfaces and stunning visual assets. From websites and apps to social creatives, dashboards, and design systems — we make your brand feel premium and intuitive.",
    image: "/samples/uiuxgaphic.jpg",
  },
  {
    id: "development",
    title: "Web Development",
    icon: <Code2 size={32} className="text-[var(--color-accent)]" />,
    description:
      "We build fast, scalable websites & apps with clean code and high ROI. Think performance, security, SEO, and real results.",
    image: "/samples/webdevelopment.jpg",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: <Megaphone size={32} className="text-[var(--color-accent)]" />,
    description:
      "No bloated teams, no wasted budgets. We help you cut costs while increasing qualified leads, traffic, and sales.",
    image: "/samples/marketing.jpg",
  },
];


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-[var(--color-bg-dark)] text-center relative"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-primary)] via-transparent to-[var(--color-bg-dark)] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 mb-16 relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
          className="text-4xl md:text-5xl font-bold text-[var(--color-text-main)] mb-6"
        >
          We Don’t Just Build Digital Products.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={1}
          className="text-lg md:text-xl text-[var(--color-text-subtle)] leading-relaxed"
        >
          We help your business get measurable results — more leads, sales, repeat customers, and a clear return on investment. Say goodbye to digital efforts that don’t pay off. We’re your growth partner, not just a service provider.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 relative z-10">
        {services.map((service, i) => (


          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={i + 2}
            className="bg-[var(--color-primary)] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {service.icon}
                <h3 className="text-xl font-semibold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {service.description}
              </p>

              <a
                href={`/${service.id}`}
                className="text-sm text-[var(--color-accent)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
