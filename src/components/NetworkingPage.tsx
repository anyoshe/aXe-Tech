"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wifi,
  Shield,
  Server,
  Cable,
  Users,
  Zap,
  CheckCircle,
  Building,
  Home,
  School,
  TrendingUp,
  Clock,
  BarChart3,
  Settings,
  Eye,
  AlertCircle
} from "lucide-react";

export default function NetworkingPage() {
  const phoneNumber = "0736889880";
  const whatsappLink = `https://wa.me/254736889880?text=Hello%20GetAxe,%20I'm%20interested%20in%20your%20Networking%20services`;

  const painPoints = [
    "Slow internet affecting productivity?",
    "Dead WiFi zones in your building?",
    "Unsecured network risking data breaches?",
    "Multiple devices causing network congestion?",
    "No IT staff to manage your network?"
  ];

  const solutionsFor = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Businesses & Offices",
      description: "Secure, high-speed networks for productivity",
      features: ["LAN/WAN setup", "VoIP systems", "Firewall security", "VPN access"]
    },
    {
      icon: <School className="w-8 h-8" />,
      title: "Schools & Institutions",
      description: "Eduroam-like WiFi, content filtering, lab networks",
      features: ["Student/Staff networks", "Content filtering", "Computer lab networking", "Digital classroom setup"]
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Homes & Smart Homes",
      description: "Whole-home WiFi, smart device integration",
      features: ["Mesh WiFi systems", "Smart home networks", "Entertainment streaming", "Home office setup"]
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Data Centers & ISPs",
      description: "Enterprise-grade networking infrastructure",
      features: ["Rack installation", "Fiber optics", "Load balancing", "Redundancy systems"]
    }
  ];

  const servicePackages = [
    {
      name: "Essential WiFi",
      idealFor: "Small offices, homes, shops",
      coverage: "Up to 2000 sq ft",
      devices: "20-30 devices",
      includes: [
        "Site survey & planning",
        "High-performance router",
        "2 WiFi access points",
        "Basic security setup",
        "1-year warranty"
      ],
      price: "KES 35,000",
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Business Network",
      idealFor: "Medium businesses, schools",
      coverage: "Up to 10,000 sq ft",
      devices: "50-100 devices",
      includes: [
        "Full site survey",
        "Enterprise router",
        "5-8 WiFi access points",
        "Managed switch setup",
        "Firewall installation",
        "Content filtering",
        "3-year warranty"
      ],
      price: "KES 120,000",
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Enterprise Grade",
      idealFor: "Large institutions, campuses",
      coverage: "10,000+ sq ft",
      devices: "100+ devices",
      includes: [
        "Complete network design",
        "Fiber optic backbone",
        "15+ WiFi access points",
        "Network segmentation",
        "24/7 monitoring",
        "Regular security audits",
        "5-year warranty",
        "Priority support"
      ],
      price: "KES 450,000+",
      popular: false,
      color: "from-orange-500 to-red-500"
    }
  ];

  const networkServices = [
    {
      title: "Structured Cabling",
      description: "Professional CAT6/CAT7 cabling with certification",
      icon: <Cable className="w-6 h-6" />,
      features: ["Cable installation", "Testing & certification", "Cable management", "Future-proofing"]
    },
    {
      title: "Wireless Networks",
      description: "Seamless WiFi coverage with zero dead zones",
      icon: <Wifi className="w-6 h-6" />,
      features: ["Site survey", "Mesh WiFi systems", "Guest networks", "Band steering"]
    },
    {
      title: "Network Security",
      description: "Protect your data with enterprise-grade security",
      icon: <Shield className="w-6 h-6" />,
      features: ["Firewall setup", "VPN configuration", "Intrusion detection", "Regular updates"]
    },
    {
      title: "Monitoring & Support",
      description: "24/7 network monitoring and maintenance",
      icon: <Eye className="w-6 h-6" />,
      features: ["24/7 monitoring", "Remote management", "Regular maintenance", "Emergency support"]
    }
  ];

  const benefits = [
    {
      title: "99.9% Uptime",
      description: "Guaranteed network reliability",
      icon: <Zap className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical assistance",
      icon: <Clock className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      title: "Future-Proof",
      description: "Scalable solutions that grow with you",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Cost Effective",
      description: "Reduce IT expenses long-term",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-amber-400"
    }
  ];

  const industriesServed = [
    "Schools & Universities",
    "Corporate Offices",
    "Healthcare Facilities",
    "Retail Stores & Malls",
    "Hospitality (Hotels/Restaurants)",
    "Manufacturing Plants",
    "Government Institutions",
    "Co-working Spaces"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-900 py-3 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                <Wifi className="w-4 h-4" />
                <span className="font-bold">Network Experts: {phoneNumber}</span>
              </a>
              <div className="hidden md:flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>24/7 Network Monitoring Available</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>✅ Free Site Survey • Lifetime Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30 z-0" />
        <div className="absolute inset-0 bg-[url('/network-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Expert Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-700 to-blue-700 rounded-full px-6 py-3 mb-8 border border-cyan-500/50">
              <Shield className="w-5 h-5" />
              <span className="font-bold">CERTIFIED NETWORKING EXPERTS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Networking Solutions
              </span>{" "}
              For Kenya
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              From WiFi installation to enterprise networks - we design, install, and maintain 
              <span className="text-cyan-300 font-semibold"> reliable, secure, and high-speed networks</span> for businesses, schools, and homes across Kenya.
            </p>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            >
              {[
                { value: "500+", label: "Networks Installed" },
                { value: "99.9%", label: "Uptime Guarantee" },
                { value: "24/7", label: "Support Response" },
                { value: "5 Years", label: "Warranty" }
              ].map((metric, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-cyan-300">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                <div className="flex items-center justify-center gap-3">
                  <Wifi className="w-5 h-5" />
                  Get Free Site Survey
                </div>
              </a>
              <Link
                href="#packages"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                View Network Packages
              </Link>
            </div>

            {/* Quick Call CTA */}
            <div className="mt-8">
              <a 
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 text-lg hover:text-cyan-300 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Emergency network issue? Call: <strong>{phoneNumber}</strong></span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left - The Problems */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl p-8 border border-red-500/30"
              >
                <h2 className="text-3xl font-bold mb-6 text-red-300">
                  <AlertCircle className="inline w-8 h-8 mr-2" />
                  Common Network Problems
                </h2>
                <div className="space-y-4">
                  {painPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-300">!</span>
                      </div>
                      <span className="text-lg">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right - Our Solutions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-2xl p-8 border border-green-500/30"
              >
                <h2 className="text-3xl font-bold mb-6 text-green-300">
                  <CheckCircle className="inline w-8 h-8 mr-2" />
                  Our Professional Solutions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {networkServices.map((service, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-green-400">
                          {service.icon}
                        </div>
                        <h3 className="font-bold">{service.title}</h3>
                      </div>
                      <p className="text-sm opacity-80">{service.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions For */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Networking Solutions For{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Every Need
              </span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Tailored network solutions designed for your specific environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {solutionsFor.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all h-full"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 mb-6 mx-auto">
                  <div className="text-cyan-400">
                    {solution.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{solution.title}</h3>
                <p className="text-gray-300 mb-6 text-center">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Network{" "}
              <span className="text-purple-300">Installation Packages</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Complete solutions from design to installation and support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicePackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`relative ${pkg.popular ? 'ring-2 ring-purple-500' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 h-full border border-white/10">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${pkg.color} mb-8`} />
                  
                  <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
                  <p className="text-gray-300 mb-1 text-center">{pkg.idealFor}</p>
                  <div className="flex items-center justify-center gap-4 my-6">
                    <div className="text-center">
                      <div className="text-sm opacity-70">Coverage</div>
                      <div className="font-bold">{pkg.coverage}</div>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div className="text-center">
                      <div className="text-sm opacity-70">Devices</div>
                      <div className="font-bold">{pkg.devices}</div>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold">{pkg.price}</div>
                    <div className="text-sm opacity-70">One-time installation</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <a
                      href={`${whatsappLink}&text=I'm%20interested%20in%20the%20${pkg.name}%20network%20package`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 rounded-full font-bold text-center ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'} transition-colors`}
                    >
                      Get This Package
                    </a>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="block w-full py-3 bg-white/10 rounded-full font-bold text-center hover:bg-white/20 transition-colors text-sm"
                    >
                      Call for Details: {phoneNumber}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Enterprise Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-8 border border-orange-500/30"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                  <Server className="w-4 h-4 text-orange-300" />
                  <span className="font-bold">ENTERPRISE SOLUTIONS</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Need a Custom Enterprise Network?</h3>
                <p className="text-gray-300">
                  Large campuses, multi-building networks, data centers, or specialized requirements? 
                  We design and implement custom enterprise-grade solutions.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-300 mb-2">Custom</div>
                <div className="text-sm opacity-80 mb-4">Tailored to your needs</div>
                <a
                  href={`${whatsappLink}&text=I%20need%20a%20custom%20enterprise%20network%20solution`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-bold hover:from-orange-700 hover:to-red-700 transition-colors whitespace-nowrap"
                >
                  Request Enterprise Quote
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Network Services Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our{" "}
              <span className="text-cyan-300">Network Services</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              End-to-end networking solutions from design to maintenance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {networkServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/20 mb-4">
                  <div className="text-cyan-400">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Why Choose{" "}
              <span className="text-green-300">Our Networking Services</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6 mx-auto">
                  <div className={benefit.color}>
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Industries We Serve in{" "}
              <span className="text-yellow-300">Kenya</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industriesServed.map((industry, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors">
                  <div className="text-sm font-medium">{industry}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Managed Services */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                    <Eye className="w-4 h-4 text-purple-300" />
                    <span className="font-bold">MANAGED NETWORK SERVICES</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Don't Want to Manage Your Network?</h3>
                  <p className="text-gray-300">
                    Our Managed Network Services include 24/7 monitoring, regular maintenance, 
                    security updates, and emergency support. Focus on your business while we handle your network.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-300">KES 15,000</div>
                      <div className="text-sm opacity-80">Per month starting</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-300">99.9%</div>
                      <div className="text-sm opacity-80">Uptime guarantee</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href={`${whatsappLink}&text=I'm%20interested%20in%20Managed%20Network%20Services`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-colors whitespace-nowrap"
                  >
                    Learn About Managed Services
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-3xl p-12 text-center border border-white/10"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Fix Your Network Problems?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Book a free site survey and get a detailed network assessment and quote
            </p>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: "📡",
                  title: "Free Site Survey",
                  action: "Book Now",
                  link: whatsappLink,
                  color: "from-cyan-600 to-blue-600"
                },
                {
                  icon: "🔧",
                  title: "Emergency Repair",
                  action: phoneNumber,
                  link: `tel:${phoneNumber}`,
                  color: "from-orange-600 to-red-600"
                },
                {
                  icon: "💬",
                  title: "Network Consultation",
                  action: "Chat with Expert",
                  link: whatsappLink,
                  color: "from-green-600 to-emerald-600"
                }
              ].map((option, idx) => (
                <a
                  key={idx}
                  href={option.link}
                  target={option.title !== "Emergency Repair" ? "_blank" : undefined}
                  rel={option.title !== "Emergency Repair" ? "noopener noreferrer" : undefined}
                  className={`bg-gradient-to-r ${option.color} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-3xl mb-4">{option.icon}</div>
                  <div className="text-xl font-bold mb-2">{option.title}</div>
                  <div className="text-lg">{option.action}</div>
                </a>
              ))}
            </div>

            {/* Free Assessment Offer */}
            <div className="p-6 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-xl border border-yellow-500/30 mb-8">
              <h3 className="text-2xl font-bold mb-4">
                <CheckCircle className="inline w-6 h-6 mr-2 text-yellow-300" />
                Free Network Assessment for New Clients
              </h3>
              <p className="text-lg mb-4">
                Get a comprehensive network analysis including security vulnerabilities, 
                coverage gaps, and performance recommendations - absolutely free!
              </p>
              <a
                href={`${whatsappLink}&text=I%20want%20a%20FREE%20Network%20Assessment`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
              >
                🎯 Claim Free Network Assessment
              </a>
            </div>

            <p className="mt-8 text-sm opacity-70">
              <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
              No obligation • Professional assessment • Detailed quote included
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Contact */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-lg font-bold mb-2">GetAxe.Tech Networking Solutions</div>
              <p className="text-sm opacity-80">Professional network installation & maintenance across Kenya</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600 rounded-full font-bold hover:bg-cyan-700 transition-colors"
              >
                <Wifi className="w-5 h-5" />
                Network Help: {phoneNumber}
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full font-bold hover:bg-green-700 transition-colors"
              >
                <span>💬</span>
                WhatsApp for Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}