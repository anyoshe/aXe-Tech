'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, easeOut } from 'framer-motion';
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLaptop,
  FaServer,
  FaCode,
  FaShieldAlt
} from 'react-icons/fa';

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  // Loading skeleton
  if (!isMounted) {
    return (
      <footer className="bg-gray-950 text-gray-300 pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-gray-800 rounded w-32"></div>
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 mt-12 pt-6 text-center">
              <div className="h-4 bg-gray-800 rounded w-48 mx-auto"></div>
              <div className="h-3 bg-gray-800 rounded w-64 mx-auto mt-2"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Company - ICT Focused */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[var(--color-accent)] rounded-lg">
                <FaLaptop className="text-black text-xl" />
              </div>
              <h3 className="text-white font-bold text-xl">GETAXE.TECH</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Your trusted ICT solutions partner. We supply quality laptops, computers, and technology equipment
              for schools, businesses, and institutions across Kenya.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/254736889880"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition"
              >
                <FaWhatsapp className="text-green-400 text-lg" />
              </a>
              <a
                href="tel:+254736889880"
                className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition"
              >
                <FaPhoneAlt className="text-blue-400 text-lg" />
              </a>
              <a
                href="mailto:hello@getaxe.tech"
                className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition"
              >
                <FaEnvelope className="text-purple-400 text-lg" />
              </a>
            </div>
          </motion.div>

          {/* ICT Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <FaServer className="text-[var(--color-accent)]" />
              ICT Solutions
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                Laptops & Computers Supply
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                Mobile Computer Labs
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                Networking & Infrastructure
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                School ERP Systems
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                IT Support & Maintenance
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <FaCode className="text-[var(--color-accent)]" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[var(--color-accent)] transition flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-[var(--color-accent)] transition flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  ICT Products Shop
                </Link>
              </li>
              <li>
                <Link href="/ict-solutions" className="text-gray-400 hover:text-[var(--color-accent)] transition flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  ICT Solutions
                </Link>
              </li>
              <li>
                <Link href="/mobile-lab" className="text-gray-400 hover:text-[var(--color-accent)] transition flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  Mobile Labs
                </Link>
              </li>
              <li>
                <Link href="/contactus" className="text-gray-400 hover:text-[var(--color-accent)] transition flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  Get Quote
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-[var(--color-accent)]" />
              Contact & Support
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[var(--color-accent)] text-sm" />
                <a href="mailto:hello@getaxe.tech" className="hover:text-[var(--color-accent)] transition">
                  hello@getaxe.tech
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[var(--color-accent)] text-sm" />
                <a href="https://wa.me/254736889880" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition">
                  +254 736 889 880
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[var(--color-accent)] text-sm" />
                <a href="tel:+254736889880" className="hover:text-[var(--color-accent)] transition">
                  +254 736 889 880
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[var(--color-accent)] text-sm" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="mt-4">
                <Link
                  href="/contactus"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
                >
                  Get ICT Consultation
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500"
        >
          <p className="text-sm">
            © {new Date().getFullYear()} GetAxe.Tech. All rights reserved. | Your Trusted ICT Solutions Partner
          </p>
          <p className="text-xs mt-2">
            Quality Laptops • Reliable Computers • Complete ICT Setup • School Technology Solutions • Business IT Infrastructure
          </p>
        </motion.div>
      </div>
    </footer>
  );
}