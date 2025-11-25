"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobileLabPage() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-start bg-black bg-opacity-70 text-white pt-20 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
          Mobile Computer Labs
        </h1>
        <p className="text-lg md:text-xl mb-6 text-center opacity-90">
          Fully portable, fully equipped laptop and tablet labs delivered directly to schools and institutions. Perfect for organizations without ICT infrastructure.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {[
            "Portable laptops & tablets",
            "Projectors & smart boards",
            "Network setup & configuration",
            "On-site ICT support & training",
            "Software & learning management systems",
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-4 bg-[#111] rounded-lg shadow-lg"
              whileHover={{ scale: 1.03 }}
            >
              {item}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6">
  <Link
    href="/contactus"
    className="w-full sm:w-auto text-center px-6 py-3 bg-[var(--color-primary)] rounded-full font-semibold hover:bg-[var(--color-primary-hover)] transition"
  >
    Book a Mobile Lab
  </Link>
  <Link
    href="/ict-solutions"
    className="w-full sm:w-auto text-center px-6 py-3 bg-[var(--color-accent)] rounded-full font-semibold hover:bg-[var(--color-primary-hover)] transition"
  >
    Back to ICT Solutions
  </Link>
</div>

      </div>
    </section>
  );
}
