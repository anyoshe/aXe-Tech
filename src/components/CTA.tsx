'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function CTA() {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/20 to-purple-500/20"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--color-accent)] rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-purple-500 bg-clip-text text-transparent">
              ICT Infrastructure?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            From laptops and mobile labs to complete ICT setups and software solutions — 
            we provide the technology your school or business needs to thrive in the digital age.
          </motion.p>
        </motion.div>

        {/* Contact Options Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {/* Phone */}
          <motion.div
            variants={fadeInUp}
            className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[var(--color-accent)]/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-[var(--color-accent)]/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400 mb-4 text-sm">Speak directly with our team</p>
              <a
                href="tel:+254736889880"
                className="text-[var(--color-accent)] font-semibold hover:underline flex items-center gap-2"
              >
                +254 736 889 880
              </a>
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            variants={fadeInUp}
            className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-green-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-green-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaWhatsapp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-gray-400 mb-4 text-sm">Quick quotes & support</p>
              <a
                href="https://wa.me/254736889880"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 font-semibold hover:underline flex items-center gap-2"
              >
                Start Chat
              </a>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fadeInUp}
            className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400 mb-4 text-sm">Detailed inquiries & quotes</p>
              <a
                href="mailto:hello@getaxe.tech"
                className="text-blue-400 font-semibold hover:underline flex items-center gap-2"
              >
                hello@getaxe.tech
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-r from-[var(--color-primary)]/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Get Your Free ICT Consultation
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let&apos;s discuss your technology needs and create a customized solution that fits your budget and requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => router.push('/contactus')}
                className="group flex items-center gap-3 bg-[var(--color-accent)] text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                onClick={() => router.push('/shop')}
                className="group flex items-center gap-3 border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>200+ Schools & Businesses Served</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>After-Sales Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}