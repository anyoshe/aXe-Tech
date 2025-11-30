'use client';

import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    quote: "GetAxe supplied 50 laptops for our school computer lab at an affordable price. The setup was professional, and their after-sales support has been exceptional.",
    author: "Mr. Johnson Mwangi",
    role: "Principal, Green Valley Academy",
    rating: 5,
    highlight: "School Computer Lab"
  },
  {
    quote: "We needed a complete networking solution for our office. GetAxe delivered reliable infrastructure and their technical team was available 24/7 for support.",
    author: "Sarah Chebet",
    role: "Office Manager, Tech Solutions Ltd",
    rating: 5,
    highlight: "Office Networking"
  },
  {
    quote: "The mobile computer lab solution transformed our rural school. Students now have access to technology they never had before. Highly recommended for educational institutions!",
    author: "Dr. Elizabeth Wambui",
    role: "Director, Hope Learning Centre",
    rating: 5,
    highlight: "Mobile Computer Lab"
  },
  {
    quote: "From laptops to printers and the school ERP system, GetAxe provided everything we needed. Their team handled the entire ICT setup seamlessly.",
    author: "David Omondi",
    role: "ICT Coordinator, Success High School",
    rating: 5,
    highlight: "Complete ICT Setup"
  },
  {
    quote: "Fast delivery of quality computers at competitive prices. Their warranty support saved us when we had hardware issues months after purchase.",
    author: "Grace Akinyi",
    role: "Procurement Manager, Business Hub",
    rating: 5,
    highlight: "Quality Hardware"
  },
  {
    quote: "The School ERP system has streamlined our operations significantly. Attendance, fees, and report generation are now automated and efficient.",
    author: "Rev. Peter Kamau",
    role: "Administrator, Faith Academy",
    rating: 5,
    highlight: "School ERP System"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Trusted by Schools & Businesses
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from educational institutions and organizations that have transformed their technology infrastructure with our solutions.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="text-blue-400/60 mb-4 group-hover:text-blue-400 transition-colors">
                <FaQuoteLeft className="text-2xl" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 italic leading-relaxed mb-4">
                "{testimonial.quote}"
              </p>

              {/* Highlight Badge */}
              <div className="inline-block bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full mb-3 border border-blue-500/30">
                {testimonial.highlight}
              </div>

              {/* Author */}
              <div className="border-t border-gray-700/50 pt-3">
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Join Our Satisfied Clients?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get quality ICT solutions that schools and businesses across Kenya trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contactus"
                className="bg-[var(--color-accent)] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Get Free Consultation
              </a>
              <a
                href="tel:+254736889880"
                className="text-gray-300 hover:text-white transition flex items-center gap-2"
              >
                Or call us directly: <span className="font-semibold">+254 736 889 880</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}