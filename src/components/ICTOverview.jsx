"use client";  
import { motion } from "framer-motion";
import Link from "next/link";

export default function ICTOverview() {
  return (
    <section className="w-full min-h-screen md:h-screen flex flex-col md:flex-col md:justify-center bg-black bg-opacity-70 text-white pt-10 md:pt-0 pb-22 md:pb-0">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          ICT Solutions for Schools, Institutions & Businesses
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Mobile Computer Labs",
              desc: "We bring portable, fully equipped laptop and tablet labs directly to schools—perfect for institutions without ICT infrastructure.",
              link: "/mobile-lab"
            },
            {
              title: "Computer Lab Setup",
              desc: "Full computer lab installation, networking, furniture guidance, software setup and ongoing maintenance.",
              link: "/computer-lab-setup"
            },
            {
              title: "School ERP & Software",
              desc: "Custom school management systems, finance modules, attendance, exam management and digital communication tools.",
              link: "/school-erp"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-[#111] rounded-xl shadow-lg hover:bg-[#1a1a1a] transition cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-sm opacity-80 mb-4">{item.desc}</p>
              <Link href={item.link} className="text-[var(--color-accent)] hover:underline">
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
