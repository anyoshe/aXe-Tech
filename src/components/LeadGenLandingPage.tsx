"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LeadGenPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-4 py-12 sm:px-6 lg:px-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get High-Intent Leads That Convert
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
         From Solar to Power Backup Systems to High-ticket services to any industry, Name it! Our leads are verified, ready to talk, and primed for conversion.
        </motion.p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="#packages" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
            View Lead Packages
          </Link>
          <Link href="/book-call" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black">
            Book Free Consultation
          </Link>
        </div>
      </div>

      {/* Why Our Leads Work */}
      <div className="mt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Why Our Leads Close</h2>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <li>✅ Verified by human agents</li>
          <li>✅ Geotargeted to your service area</li>
          <li>✅ High purchase intent (not info seekers)</li>
          <li>✅ Delivered directly to your CRM or inbox</li>
        </ul>
      </div>

      {/* Lead Packages */}
      <div id="packages" className="mt-24">
        <h2 className="text-3xl font-bold text-center">Choose Your Lead Package</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Starter Pack</h3>
            <p className="text-gray-300 mt-2">15 Verified Leads</p>
            <p className="text-2xl font-bold text-red-400 mt-4">KES 8,500</p>
            <Link href="/checkout?package=starter" className="mt-6 inline-block bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              Get Started
            </Link>
          </div>
          {/* Growth */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-red-500">
            <h3 className="text-xl font-semibold">Growth Pack</h3>
            <p className="text-gray-300 mt-2">30 Verified Leads</p>
            <p className="text-2xl font-bold text-red-400 mt-4">KES 16,000</p>
            <Link href="/checkout?package=growth" className="mt-6 inline-block bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              Get Started
            </Link>
          </div>
          {/* Pro */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Pro Pack</h3>
            <p className="text-gray-300 mt-2">60 Verified Leads</p>
            <p className="text-2xl font-bold text-red-400 mt-4">KES 29,500</p>
            <Link href="/checkout?package=pro" className="mt-6 inline-block bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-24 max-w-3xl mx-auto text-gray-300">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold">Where do your leads come from?</h4>
            <p>We run targeted digital campaigns via paid ads, SEO, and social platforms. All leads are vetted before delivery.</p>
          </div>
          <div>
            <h4 className="font-semibold">How fast do I start receiving leads?</h4>
            <p>Delivery starts within 3–5 business days depending on your niche and target location.</p>
          </div>
          <div>
            <h4 className="font-semibold">Can I get custom lead solutions?</h4>
            <p>Yes! Book a free consultation and we’ll tailor a campaign just for your business goals.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-24 bg-gray-800 p-10 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-white">Ready to Grow with Quality Leads?</h3>
        <p className="text-gray-300 mt-2">Start today or book a free call to learn how lead generation can fuel your business.</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="#packages" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
            View Packages
          </Link>
          <Link href="/book-call" className="text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black">
            Book a Call
          </Link>
        </div>
      </div>
    </section>
  );
}
