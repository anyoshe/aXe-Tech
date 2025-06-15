'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CTA from './CTA';

const ecommerceProjects = [
  {
    src: '/samples/ecommerce.jpg',
    link: '', // replace with actual
  },
  {
    src: '/samples/my-logo.png',
    link: '', // not yet published
  },
  {
    src: '/samples/ecommerce3.jpg',
    link: null, // not yet published
  },
];

export default function EcommerceShowcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewSite = (link: string | null) => {
    if (link && link.trim() !== '') {
      window.open(link, '_blank');
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen px-6 py-12 text-white">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-lime-400 hover:text-lime-300 transition mb-6 inline-block">
          ← Back to Home
        </Link>

        <motion.h1
          className="text-4xl lg:text-5xl font-bold text-center mb-10 text-lime-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          E-commerce Designs
        </motion.h1>

        <motion.p
          className="text-center text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Carefully designed online stores that merge visual appeal with functionality —
          optimized for conversions, trust, and smooth product discovery.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {ecommerceProjects.map(({ src, link }, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg border border-gray-800 bg-gray-900"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`E-commerce ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <button
                  onClick={() => handleViewSite(link)}
                  className="mt-2 px-4 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-400 transition"
                >
                  View Website
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <CTA />
        </div>
      </div>

      {/* ✅ Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain p-4 cursor-zoom-out"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ❌ Not Published Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-gray-800 text-white px-6 py-4 rounded-xl text-center max-w-sm mx-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <p className="text-lg font-semibold mb-2">Website not yet published</p>
              <button
                className="mt-2 px-4 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-400 transition"
                onClick={() => setShowModal(false)}
              >
                Okay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
