'use client';

import { motion } from 'framer-motion';
import Link from "next/link";
import { FaLaptop, FaServer, FaNetworkWired, FaShieldAlt, FaTools, FaHeadset } from 'react-icons/fa';

const cards = [
  {
    title: 'Quality ICT Hardware',
    icon: FaLaptop,
    color: 'text-blue-400',
    desc: 'Genuine laptops, computers, tablets, and printers from trusted brands with warranty and after-sales support.',
  },
  {
    title: 'Complete ICT Setup',
    icon: FaServer,
    color: 'text-green-400',
    desc: 'End-to-end technology solutions for schools and businesses - from procurement to installation and training.',
  },
  {
    title: 'Networking Solutions',
    icon: FaNetworkWired,
    color: 'text-purple-400',
    desc: 'Reliable networking infrastructure, internet setup, and connectivity solutions for seamless operations.',
  },
  {
    title: 'IT Support & Maintenance',
    icon: FaTools,
    color: 'text-red-400',
    desc: 'Ongoing technical support, maintenance, and troubleshooting to keep your systems running smoothly.',
  },
  {
    title: 'School ERP Systems',
    icon: FaShieldAlt,
    color: 'text-yellow-400',
    desc: 'Customized school management systems for administration, academics, finance, and communication.',
  },
  {
    title: 'Mobile Computer Labs',
    icon: FaHeadset,
    color: 'text-cyan-400',
    desc: 'Portable, scalable computer lab solutions that bring technology to any learning environment.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Subtle Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
        >
          Why Choose Getaxe Technologies?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto"
        >
          Your trusted partner for comprehensive ICT solutions, quality hardware, and reliable technology support across Kenya.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Complete Technology Solutions for Schools & Businesses
            </h2>

            <p className="text-lg text-gray-300">
              We understand that technology is the backbone of modern education and business operations. That's why we provide end-to-end ICT solutions that are affordable, reliable, and tailored to your specific needs.
            </p>

            <ul className="space-y-4 text-base text-gray-200 list-none">
              <li className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">✓</span>
                <span><strong>100+ Institutions Served:</strong> Trusted by schools and businesses nationwide</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">✓</span>
                <span><strong>Quality Guaranteed:</strong> Genuine products with warranty and support</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">✓</span>
                <span><strong>Affordable Pricing:</strong> Competitive rates for educational institutions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">✓</span>
                <span><strong>Full Setup & Training:</strong> We don't just sell, we implement and train</span>
              </li>
            </ul>

            <div className="mt-8 text-center lg:text-left">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-block"
              >
                <Link
                  href="/contactus"
                  className="inline-block bg-[var(--color-accent)] text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer text-lg"
                >
                  Get Free ICT Consultation
                </Link>
              </motion.div>
              <p className="text-gray-400 mt-3 text-sm">
                Call us directly: <a href="tel:+254736889880" className="text-[var(--color-accent)] hover:underline">+254 736 889 880</a>
              </p>
            </div>
          </motion.div>

          {/* Right Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`text-3xl mb-4 ${card.color}`}>
                  <card.icon />
                </div>
                <h3 className={`text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300`}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your ICT Infrastructure?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you need laptops for your computer lab, networking for your office, or complete ICT setup for your institution - we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-[var(--color-accent)] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Browse ICT Products
              </Link>
              <Link
                href="/ict-solutions"
                className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                View Solutions
              </Link>
              <a
                href="https://wa.me/254736889880"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                WhatsApp Quote
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}