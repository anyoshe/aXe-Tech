"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Zap,
  Users,
  CheckCircle,
  Phone,
  Wrench,
  MapPin,
  BarChart3,
  Monitor
} from "lucide-react";

export default function ComputerLabSetupPage() {
  const phoneNumber = "0736889880";
  const whatsappLink = `https://wa.me/254736889880?text=Hello%20GetAxe,%20I'm%20interested%20in%20your%20Permanent%20Computer%20Lab%20services`;

  const trustStats = [
    { value: "150+", label: "Schools Equipped" },
    { value: "1,200+", label: "Networks Installed" },
    { value: "3 yrs", label: "Typical ROI" },
    { value: "99.9%", label: "Uptime" }
  ];

  const process = [
    { step: "Assess & Design", desc: "Site survey, needs analysis and bespoke design." },
    { step: "Procure & Install", desc: "Quality hardware, cabling, networking and furniture." },
    { step: "Train & Launch", desc: "Teacher training, LMS setup and handover." },
    { step: "Maintain & Scale", desc: "Warranty, monitoring and upgrade paths." }
  ];

  const packages = [
    {
      name: "Starter Lab — 20 Seats",
      price: "From KES 950,000",
      features: ["20 workstations", "NAS / local server", "Wi‑Fi & cabling", "Furniture & ergonomics"]
    },
    {
      name: "Standard Lab — 40 Seats",
      price: "From KES 1,750,000",
      features: ["40 workstations", "LMS & content", "Projector + sound", "Teacher training"]
    },
    {
      name: "Campus / Enterprise",
      price: "Custom",
      features: ["Multi-room design", "Fiber backbone", "Redundancy & monitoring", "SLA-backed support"]
    }
  ];

  const faqs = [
    { q: "Do you provide financing support?", a: "Yes — we advise on procurement and can connect you to financing partners and grant options." },
    { q: "How long does installation take?", a: "Typical Starter Lab installs within 2–3 weeks after procurement; timelines vary by scope." },
    { q: "Do you train teachers?", a: "We deliver hands-on teacher training and lab management resources as standard." }
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#05060a] to-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-cyan-400 px-4 py-2 rounded-full shadow-sm">
              <Shield className="w-5 h-5 text-black" />
              <span className="font-semibold text-black">Turnkey Computer Labs</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Build a Future-Ready Computer Lab — Design, Install, Maintain
            </h1>

            <p className="text-lg text-gray-300 max-w-2xl">
              We design and deliver permanent computer labs that improve learning outcomes and reduce long-term costs.
              From procurement to teacher training, GetAxe handles the full project so your school gets a lab that works from day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-black shadow-lg hover:scale-[1.02] transition">
                Get a Quote
              </a>
              <Link href="/contactus?demo=lab" className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full font-semibold hover:bg-white/5 transition">
                Book Consultation
              </Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md">
              {trustStats.map((s, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 text-center backdrop-blur-sm border border-white/6">
                  <div className="text-lg font-bold text-green-300">{s.value}</div>
                  <div className="text-xs opacity-80">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-tr from-[#0b1220] to-[#071126] p-6 shadow-2xl border border-white/6">
              <div className="rounded-2xl bg-gradient-to-br from-[#081226] to-[#061224] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-lg">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Premium Hardware</div>
                    <div className="text-sm opacity-80">Carefully chosen models for durability</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/3 rounded p-3">
                    <div className="text-sm opacity-80">Seats</div>
                    <div className="font-bold">20 — 40+</div>
                  </div>
                  <div className="bg-white/3 rounded p-3">
                    <div className="text-sm opacity-80">Warranty</div>
                    <div className="font-bold">1–3 Years</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm opacity-80">Quick call</div>
                  <a href={`tel:${phoneNumber}`} className="inline-block mt-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold text-black">{phoneNumber}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Process */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-3"><Zap className="w-5 h-5 text-yellow-300" /><div className="font-bold">Future-Proof</div></div>
            <div className="text-sm opacity-90">Scalable labs with upgrade paths and monitoring.</div>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-3"><Users className="w-5 h-5 text-green-300" /><div className="font-bold">Teacher Training</div></div>
            <div className="text-sm opacity-90">Hands-on training to maximise classroom impact.</div>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-3"><Wrench className="w-5 h-5 text-cyan-300" /><div className="font-bold">End-to-End</div></div>
            <div className="text-sm opacity-90">Design, procurement, install and SLA-backed support.</div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Simple 4-step Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {process.map((p, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg text-sm">
                <div className="font-bold mb-2">{p.step}</div>
                <div className="opacity-90">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-[#071021] to-[#04101a] rounded-2xl border border-white/6 hover:scale-[1.02] transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-lg">{pkg.name}</div>
                  <div className="text-sm opacity-80">{pkg.price}</div>
                </div>
                <ul className="mb-4 text-sm space-y-1">
                  {pkg.features.map((f, idx) => <li key={idx}>• {f}</li>)}
                </ul>
                <div className="flex gap-2">
                  <a href={`${whatsappLink}&text=I%20want%20a%20quote%20for%20${encodeURIComponent(pkg.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-black font-bold text-center">Request Quote</a>
                  <a href={`tel:${phoneNumber}`} className="px-4 py-2 bg-white/10 rounded-full font-semibold">Call</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ & CTA */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3 text-sm">
              {faqs.map((f, i) => (
                <div key={i}>
                  <div className="font-semibold">{f.q}</div>
                  <div className="opacity-90">{f.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl mb-3">Ready to build a lab that lasts?</h3>
              <p className="mb-6">Book a discovery call and we’ll walk your leadership team through costs, timelines and funding options.</p>
            </div>
            <div className="flex gap-3">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-black font-bold text-center">Get a Quote</a>
              <Link href="/contactus?demo=lab" className="px-4 py-3 bg-white/10 rounded-full font-semibold text-center">Book Consultation</Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
