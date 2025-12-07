"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Shield, TrendingUp, Users, Clock, BarChart } from "lucide-react";
import Navbar from "./Navbar";

export default function SchoolERPPage() {
  const features = [
    {
      title: "Complete Financial Management",
      description: "Track fees, expenses, payroll, and generate financial reports with real-time dashboards",
      icon: TrendingUp,
      color: "bg-blue-900"
    },
    {
      title: "Smart Attendance System",
      description: "Biometric, RFID, or mobile-based attendance with automated parent notifications",
      icon: Users,
      color: "bg-green-900"
    },
    {
      title: "Academic Excellence Tools",
      description: "Lesson planning, gradebooks, report cards, and performance analytics",
      icon: BarChart,
      color: "bg-purple-900"
    },
    {
      title: "Parent-Teacher Collaboration",
      description: "Dedicated portals, messaging, event calendars, and progress tracking",
      icon: Shield,
      color: "bg-amber-900"
    },
    {
      title: "Administrative Automation",
      description: "Timetables, inventory, library management, and transport tracking",
      icon: Clock,
      color: "bg-red-900"
    },
    {
      title: "Compliance & Security",
      description: "Data protection, audit trails, role-based access, and GDPR compliance",
      icon: CheckCircle,
      color: "bg-indigo-900"
    }
  ];

  const benefits = [
    "Reduce administrative workload by 60%",
    "Improve parent engagement by 40%",
    "Cut operational costs by 30%",
    "Enhance academic performance tracking",
    "Streamline communication across departments",
    "Make data-driven decisions with analytics"
  ];

  const painPoints = [
    "Manual record-keeping errors eating your time?",
    "Parents complaining about lack of transparency?",
    "Struggling with inefficient communication channels?",
    "Financial management becoming too complex?",
    "Exams and grading taking too long to process?"
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-900/60 z-10"></div>
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/samples/schoolvideo.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-6 relative z-20 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted by 100+ Schools Nationwide</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your School Management with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Intelligent ERP
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              All-in-one platform that automates administration, enhances learning outcomes, and connects your entire school community in one seamless system.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                { value: "90%", label: "Time Saved on Admin Tasks" },
                { value: "45%", label: "Faster Communication" },
                { value: "100%", label: "Data Accuracy" },
                { value: "70%", label: "Parent Satisfaction" }
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-300">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contactus?demo=erp"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>🎯</span>
                  Book Free Personalized Demo
                </div>
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Are You Facing These{" "}
              <span className="text-red-300">Challenges</span>?
            </h2>
            <div className="space-y-4">
              {painPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-300">!</span>
                  </div>
                  <p className="text-lg">{point}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/30 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">You're Not Alone!</h3>
              <p className="text-xl mb-6">
                Most schools face these exact challenges. Our ERP system is designed specifically to solve them.
              </p>
              <Link
                href="/contactus?consultation=free"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Get Free Consultation
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Everything You Need in{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Modular design - Start with what you need, expand as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className={`${feature.color} rounded-2xl p-8 h-full border border-white/10 group-hover:border-blue-500/50 transition-all duration-300`}>
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="opacity-80 mb-4">{feature.description}</p>
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-sm text-blue-300 font-medium">Learn more →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Transform Your School with{" "}
              <span className="text-green-300">Measurable Results</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit}</h3>
                    <p className="opacity-80">Backed by data from our current school partners</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Case Study Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 p-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl border border-green-500/30"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                    <span className="text-yellow-300">★</span>
                    <span className="font-medium">Case Study</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Green Valley Academy</h3>
                  <p className="opacity-90">Achieved 65% reduction in administrative workload within 3 months of implementation</p>
                </div>
                <Link
                  href="/case-studies/green-valley"
                  className="px-6 py-3 bg-green-600 rounded-full font-bold hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  Read Full Case Study
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing & CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Flexible plans starting from just $99/term. No hidden fees, cancel anytime.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  name: "Starter",
                  price: "$99",
                  desc: "Perfect for small schools",
                  features: ["Up to 200 students", "Basic modules", "Email support"]
                },
                {
                  name: "Professional",
                  price: "$299",
                  desc: "Most popular choice",
                  features: ["Unlimited students", "All modules", "Priority support", "Custom reports"],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "For large institutions",
                  features: ["Multi-branch support", "White-label", "Dedicated manager", "API access"]
                }
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-2xl p-8 ${plan.popular ? 'bg-white text-gray-900' : 'bg-white/10 text-white'} border ${plan.popular ? 'border-blue-500' : 'border-white/20'}`}
                >
                  {plan.popular && (
                    <div className="inline-block bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg">/term</span></div>
                  <p className="mb-6 opacity-80">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contactus?plan=${plan.name.toLowerCase()}`}
                    className={`block w-full py-3 rounded-full font-bold ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/20 hover:bg-white/30'} transition-colors`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="bg-black/50 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-xl mb-6 opacity-90">
                Book a 30-minute personalized demo. We'll show you exactly how our ERP can solve your specific challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contactus?demo=personalized"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  📞 Book Free Demo Call
                </Link>
                <Link
                  href="/contactus?quote=free"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  Get Free Custom Quote
                </Link>
              </div>
              <p className="mt-6 text-sm opacity-70">
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                No credit card required • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How long does implementation take?",
                a: "Typically 2-4 weeks for full setup. We provide training and support throughout."
              },
              {
                q: "Can we customize the ERP for our specific needs?",
                a: "Yes! We offer extensive customization options to fit your school's unique workflows."
              },
              {
                q: "Is training included?",
                a: "Comprehensive training for all staff members is included with every plan."
              },
              {
                q: "How secure is our data?",
                a: "Enterprise-grade security with daily backups, encryption, and GDPR compliance."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                <p className="opacity-80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}