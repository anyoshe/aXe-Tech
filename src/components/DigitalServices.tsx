"use client";

import { motion, Variants } from "framer-motion";
import {
  Palette,
  PenTool,
  Code2,
  Megaphone,
  Building,
  ShoppingCart,
  Database,
  BarChart3,
  Users,
  Shield,
  Zap,
  CheckCircle,
  TrendingUp,
  Target
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

// ------------------------------------------------------
// DIGITAL SERVICES DATA
// ------------------------------------------------------
const digitalServices = [
  {
    id: "branding",
    title: "Strategic Branding",
    icon: <Palette className="w-8 h-8" />,
    description: "Build memorable brand identities that command attention and drive loyalty",
    detailed: [
      "Logo & visual identity systems",
      "Brand strategy & positioning",
      "Style guides & brand manuals",
      "Competitor analysis & differentiation"
    ],
    image: "/samples/brand3.jpg",
    color: "from-purple-600 to-pink-600",
    metrics: ["45%", "Brand recall increase"],
    ctaText: "Build Your Brand"
  },
  {
    id: "designing",
    title: "UI/UX & Graphic Design",
    icon: <PenTool className="w-8 h-8" />,
    description: "Intuitive designs that convert visitors into customers",
    detailed: [
      "User research & wireframing",
      "High-fidelity UI design",
      "Design systems & prototypes",
      "Marketing collateral & social graphics"
    ],
    image: "/samples/uiuxgaphic.jpg",
    color: "from-blue-600 to-cyan-600",
    metrics: ["68%", "Higher conversion rates"],
    ctaText: "Design That Converts"
  },
  {
    id: "development",
    title: "Web & App Development",
    icon: <Code2 className="w-8 h-8" />,
    description: "High-performance digital products built for growth",
    detailed: [
      "Custom web applications",
      "Mobile apps (iOS & Android)",
      "E-commerce platforms",
      "Progressive Web Apps (PWA)"
    ],
    image: "/samples/webdevelopment.jpg",
    color: "from-green-600 to-emerald-600",
    metrics: ["2.5x", "Faster page speeds"],
    ctaText: "Build Your Digital Product"
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: <Megaphone className="w-8 h-8" />,
    description: "Data-driven campaigns that generate measurable ROI",
    detailed: [
      "SEO & content strategy",
      "Social media marketing",
      "PPC & conversion optimization",
      "Email marketing automation"
    ],
    image: "/samples/marketing.jpg",
    color: "from-orange-600 to-red-600",
    metrics: ["3.2x", "ROI on ad spend"],
    ctaText: "Grow Your Revenue"
  },
  {
    id: "erp",
    title: "Business ERP Systems",
    icon: <Database className="w-8 h-8" />,
    description: "Complete business management solutions tailored to your needs",
    detailed: [
      "Inventory & supply chain management",
      "CRM & sales pipeline automation",
      "Accounting & financial reporting",
      "HR & payroll management"
    ],
    image: "/samples/ERp.jpg",
    color: "from-indigo-600 to-purple-600",
    metrics: ["40%", "Operational efficiency gain"],
    ctaText: "Streamline Operations"
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    icon: <ShoppingCart className="w-8 h-8" />,
    description: "Scalable online stores that drive sales 24/7",
    detailed: [
      "Custom e-commerce development",
      "Multi-vendor marketplaces",
      "Payment gateway integration",
      "Inventory & order management"
    ],
    image: "/samples/ecommerce.jpg",
    color: "from-amber-600 to-yellow-600",
    metrics: ["85%", "Faster checkout process"],
    ctaText: "Launch Your Store"
  }
];

// Business Solutions
const businessSolutions = [
  {
    title: "SME Growth Platform",
    description: "All-in-one solution for small to medium businesses",
    features: ["CRM", "Accounting", "Inventory", "Invoicing"],
    price: "From $199/month",
    icon: <Building className="w-6 h-6" />
  },
  {
    title: "Retail Management Suite",
    description: "Point of sale, inventory, and customer management",
    features: ["POS System", "Stock Management", "Loyalty Programs", "Analytics"],
    price: "From $299/month",
    icon: <ShoppingCart className="w-6 h-6" />
  },
  {
    title: "Enterprise ERP",
    description: "Scalable solution for large organizations",
    features: ["Multi-branch", "Custom Workflows", "API Access", "24/7 Support"],
    price: "Custom Quote",
    icon: <Database className="w-6 h-6" />
  }
];

// Key Benefits
const keyBenefits = [
  {
    title: "End-to-End Solutions",
    description: "From branding to development to marketing - we handle it all",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "Proven Results",
    description: "Data-backed strategies that deliver measurable ROI",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "Scalable Technology",
    description: "Solutions that grow with your business",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Expert Team",
    description: "Seasoned professionals with industry expertise",
    icon: <Users className="w-6 h-6" />
  }
];

// ------------------------------------------------------
// ANIMATIONS
// ------------------------------------------------------
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// ------------------------------------------------------
// PAGE
// ------------------------------------------------------
export default function DigitalServicesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] z-0" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto text-center"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-medium">Trusted by 300+ Businesses Nationwide</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Complete{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Digital Transformation
                </span>{" "}
                for Modern Businesses
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
                From brand identity to enterprise ERP systems — we provide end-to-end digital
                solutions that drive growth, efficiency, and competitive advantage.
              </p>

              {/* Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto"
              >
                {[
                  { value: "95%", label: "Client Retention" },
                  { value: "300+", label: "Projects Delivered" },
                  { value: "40%", label: "Avg. Growth Increase" },
                  { value: "24/7", label: "Support Available" }
                ].map((metric, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-blue-300">{metric.value}</div>
                    <div className="text-sm opacity-80">{metric.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contactus?consultation=free"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span>🎯</span>
                    Get Free Digital Audit
                  </div>
                </Link>
                <Link
                  href="#services"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Explore Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Digital Services
                </span>
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Comprehensive solutions tailored to your business needs
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {digitalServices.map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  custom={i}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`} />
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-300">{service.metrics[0]}</div>
                          <div className="text-xs opacity-70">{service.metrics[1]}</div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{service.description}</p>

                      <ul className="space-y-2 mb-6">
                        {service.detailed.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <Link
                          href={`/${service.id}`}
                          className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-2"
                        >
                          Learn more
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                          href={`/contactus?service=${service.id}`}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
                        >
                          {service.ctaText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Business Solutions Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Tailored{" "}
                <span className="text-purple-300">Business Solutions</span>
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Scalable systems designed for different business needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {businessSolutions.map((solution, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 mb-6">
                    <div className="text-purple-400">
                      {solution.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                  <p className="text-gray-300 mb-6">{solution.description}</p>
                  <div className="space-y-2 mb-6">
                    {solution.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-center py-4 border-t border-white/10">
                    {solution.price}
                  </div>
                  <Link
                    href={`/contactus?solution=${solution.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-center font-bold hover:from-purple-700 hover:to-pink-700 transition-all mt-4"
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* E-commerce Special */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-2xl p-8 border border-amber-500/30"
            >

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span className="font-bold text-sm sm:text-base">E-COMMERCE SPECIAL</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Launch Your Online Store in 14 Days</h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Complete e-commerce solution with payment integration, inventory management,
                    and marketing tools. Start selling online fast!
                  </p>
                </div>
                <div className="text-center flex-shrink-0 w-full md:w-auto">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-2">$1,999</div>
                  <div className="text-xs sm:text-sm opacity-80 mb-4">One-time setup fee</div>
                  <Link
                    href="/contactus?service=ecommerce-launch"
                    className="inline-flex items-center justify-center px-6 py-3 bg-yellow-600 text-black rounded-full font-bold hover:bg-yellow-700 transition-colors whitespace-nowrap min-w-[140px] text-sm sm:text-base"
                  >
                    Launch Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyBenefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
                    <div className="text-blue-400">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-12 text-center border border-white/10"
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Schedule a free strategy session with our digital experts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contactus?meeting=discovery"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  📞 Book Free Strategy Call
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  View Our Portfolio
                </Link>
              </div>
              <p className="mt-8 text-sm opacity-70">
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                No obligation • 30-minute consultation • Custom proposal included
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our <span className="text-cyan-300">4-Step Process</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: "01", title: "Discovery", desc: "Understand your goals & challenges" },
                { step: "02", title: "Strategy", desc: "Create customized solutions" },
                { step: "03", title: "Execution", desc: "Develop & implement with precision" },
                { step: "04", title: "Growth", desc: "Optimize & scale your success" }
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}