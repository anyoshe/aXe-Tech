'use client';

import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

export default function CTA() {
  const router = useRouter();

  return (
    <section
      id="contact"
      className="py-10 sm:py-20 px-4 sm:px-6 bg-gradient-to-tr from-black via-gray-900 to-black text-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-2.5xl md:text-4xl lg:text-5xl font-bold mb-6 leading-snug sm:leading-tight">
          Elevate Your Brand with Code, Creativity & Conversion
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-4 sm:mb-8 px-2">
          Whether you&apos;re building a digital product, launching a bold brand campaign,
          or scaling through social media—our team blends strategy, design, and
          development to deliver results.
        </p>

        <button
          onClick={() => router.push('/contactus')}
          className="inline-flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 transition-all px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-base sm:text-lg shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Contact Us
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
