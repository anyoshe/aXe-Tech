'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Digital Launches',
    color: 'text-blue-400',
    desc: 'Websites, landing pages, and funnels built for performance and scale.',
  },
  {
    title: 'Brand Crafting',
    color: 'text-green-400',
    desc: 'Logos, identities, and vibes that turn ideas into iconic brands.',
  },
  {
    title: 'Ad Creative',
    color: 'text-purple-400',
    desc: 'Eye-catching content designed for social and paid growth.',
  },
  {
    title: 'Social Management',
    color: 'text-yellow-400',
    desc: 'Engaging storytelling across platforms to boost your presence.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Shared Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
        >
          Why Choose Axe-Tech?
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mx-auto max-w-md md:max-w-none">
              Empowering Startups & Visionaries
            </h2>
            <p className="text-lg text-gray-300 max-w-md mx-auto md:mx-0">
              From bold startups to rising brands, we craft digital experiences that amplify your story and drive impact with precision.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-gray-200 list-none mx-auto md:mx-0">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-blue-400">⚡</span> Strategy-driven solutions
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-blue-400">🎯</span> Conversion-focused design
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-blue-400">🔁</span> Agile and iterative process
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-blue-400">🤝</span> Transparent collaboration
              </li>
            </ul>
          </motion.div>

          {/* Right: Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center"
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800/30 backdrop-blur-md rounded-xl p-5 border border-gray-700/20 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group text-center max-w-xs w-full"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-xl font-semibold ${card.color} group-hover:text-white transition-colors duration-300`}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 mt-2">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}