"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  Shield,
  Clock,
  Users,
  Zap,
  CheckCircle,
  Building,
  Home,
  School,
  TrendingUp,
  BarChart3,
  Settings,
  AlertTriangle,
  Headphones,
  Cpu,
  Smartphone,
  Wifi,
  Printer,
  Database,
  Cloud
} from "lucide-react";

export default function ITSupportPage() {
  const phoneNumber = "0736889880";
  const whatsappLink = `https://wa.me/254736889880?text=Hello%20GetAxe,%20I%20need%20IT%20Support%20services`;

  const painPoints = [
    "Frequent computer crashes slowing down work?",
    "No reliable IT support when you need it?",
    "Viruses and malware affecting your systems?",
    "Outdated software causing compatibility issues?",
    "IT equipment repairs taking too long?"
  ];

  const supportPlans = [
    {
      name: "Basic Support",
      idealFor: "Small businesses, startups",
      devices: "Up to 10 devices",
      includes: [
        "Remote technical support",
        "Basic troubleshooting",
        "Software installation",
        "Virus removal",
        "Email support (9AM-5PM)",
        "Monthly system check"
      ],
      responseTime: "4 business hours",
      price: "KES 8,000/month",
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Pro Support",
      idealFor: "Medium businesses, schools",
      devices: "Up to 25 devices",
      includes: [
        "Unlimited remote support",
        "On-site visits (2/month)",
        "Network monitoring",
        "Security updates",
        "Phone & WhatsApp support (8AM-8PM)",
        "Weekly system checks",
        "Backup management",
        "IT consultation"
      ],
      responseTime: "2 business hours",
      price: "KES 25,000/month",
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Enterprise Support",
      idealFor: "Large organizations, institutions",
      devices: "50+ devices",
      includes: [
        "24/7 priority support",
        "Unlimited on-site visits",
        "Dedicated support engineer",
        "Advanced security management",
        "IT strategy planning",
        "Regular staff training",
        "Disaster recovery planning",
        "Quarterly IT audits",
        "Custom SLA agreements"
      ],
      responseTime: "30 minutes",
      price: "KES 75,000+/month",
      popular: false,
      color: "from-orange-500 to-red-500"
    }
  ];

  const servicesOffered = [
    {
      title: "Computer Repairs",
      description: "Laptop, desktop, and server repairs",
      icon: <Cpu className="w-6 h-6" />,
      items: ["Hardware diagnostics", "Component replacement", "Data recovery", "Performance tuning"]
    },
    {
      title: "Network Support",
      description: "WiFi, LAN, and internet troubleshooting",
      icon: <Wifi className="w-6 h-6" />,
      items: ["Network diagnostics", "Router configuration", "Internet connectivity", "VPN setup"]
    },
    {
      title: "Software Services",
      description: "Installation, updates, and troubleshooting",
      icon: <Settings className="w-6 h-6" />,
      items: ["OS installation", "Software updates", "License management", "Driver updates"]
    },
    {
      title: "Security Services",
      description: "Protection against threats and breaches",
      icon: <Shield className="w-6 h-6" />,
      items: ["Antivirus installation", "Firewall setup", "Security patches", "Malware removal"]
    },
    {
      title: "Device Support",
      description: "Printers, scanners, and peripherals",
      icon: <Printer className="w-6 h-6" />,
      items: ["Printer setup", "Scanner configuration", "Driver updates", "Troubleshooting"]
    },
    {
      title: "Cloud & Backup",
      description: "Data protection and cloud services",
      icon: <Cloud className="w-6 h-6" />,
      items: ["Backup setup", "Cloud migration", "Data recovery", "Storage management"]
    }
  ];

  const benefits = [
    {
      title: "95% Less Downtime",
      description: "Proactive maintenance reduces system failures",
      icon: <Zap className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      title: "Fast Response",
      description: "Quick resolution of IT issues",
      icon: <Clock className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      title: "Cost Savings",
      description: "Reduce IT expenses by up to 40%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Expert Team",
      description: "Certified technicians with local experience",
      icon: <Users className="w-6 h-6" />,
      color: "text-amber-400"
    }
  ];

  const industriesServed = [
    "Schools & Universities",
    "Corporate Offices",
    "Healthcare Facilities",
    "Retail & Supermarkets",
    "Manufacturing Plants",
    "Government Offices",
    "Non-Profit Organizations",
    "Co-working Spaces"
  ];

  const supportStats = [
    { value: "98%", label: "Client Satisfaction" },
    { value: "30 min", label: "Avg. Response Time" },
    { value: "2 hrs", label: "Avg. Resolution Time" },
    { value: "24/7", label: "Support Availability" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-amber-900 to-yellow-800 py-3 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
              >
                <Headphones className="w-4 h-4" />
                <span className="font-bold">IT Support Hotline: {phoneNumber}</span>
              </a>
              <div className="hidden md:flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Support Available</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>✅ No Contract Required • Pay Monthly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-yellow-900/20 to-orange-900/30 z-0" />
        <div className="absolute inset-0 bg-[url('/tech-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Expert Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-700 to-amber-700 rounded-full px-6 py-3 mb-8 border border-yellow-500/50">
              <Shield className="w-5 h-5" />
              <span className="font-bold">CERTIFIED IT SUPPORT EXPERTS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Reliable{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                IT Support & Maintenance
              </span>{" "}
              For Kenya
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Keep your business running smoothly with our professional IT support services.
              <span className="text-yellow-300 font-semibold"> Reduce downtime by 95%</span> and focus on what matters most.
            </p>

            {/* Support Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            >
              {supportStats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full font-bold text-lg hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
              >
                <div className="flex items-center justify-center gap-3">
                  <Headphones className="w-5 h-5" />
                  Get Instant IT Support
                </div>
              </a>
              <Link
                href="#plans"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                View Support Plans
              </Link>
            </div>

            {/* Emergency CTA */}
            <div className="mt-8">
              <a 
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 text-lg hover:text-yellow-300 transition-colors"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency IT issue? Call now: <strong>{phoneNumber}</strong></span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem & Cost */}
      <section className="py-20 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left - Cost of Downtime */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl p-8 border border-red-500/30"
              >
                <h2 className="text-3xl font-bold mb-6 text-red-300">
                  <AlertTriangle className="inline w-8 h-8 mr-2" />
                  The High Cost of IT Downtime
                </h2>
                <div className="space-y-6">
                  {[
                    "Average cost of downtime: KES 50,000+ per hour for businesses",
                    "Lost productivity from staff waiting for IT fixes",
                    "Missed deadlines and customer dissatisfaction",
                    "Data loss from lack of proper backups",
                    "Security breaches from outdated software"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-300">✗</span>
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right - Our Solution */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-2xl p-8 border border-green-500/30"
              >
                <h2 className="text-3xl font-bold mb-6 text-green-300">
                  <CheckCircle className="inline w-8 h-8 mr-2" />
                  Our IT Support Solution
                </h2>
                <div className="space-y-6">
                  {[
                    "Proactive maintenance prevents 95% of issues",
                    "Fast response times (30 min - 4 hours)",
                    "Expert team with local experience",
                    "Monthly cost as low as KES 8,000",
                    "24/7 emergency support available"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-300">✓</span>
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-black/30 rounded-xl">
                  <div className="text-2xl font-bold text-green-300 mb-2">Save Up To 40%</div>
                  <p className="text-sm opacity-80">Compared to hiring full-time IT staff</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Plans */}
      <section id="plans" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Flexible{" "}
              <span className="text-yellow-300">IT Support Plans</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Choose the support level that fits your needs. All plans include proactive maintenance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`relative ${plan.popular ? 'ring-2 ring-yellow-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 h-full border border-white/10">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${plan.color} mb-8`} />
                  
                  <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                  <p className="text-gray-300 mb-1 text-center">{plan.idealFor}</p>
                  <p className="text-sm opacity-70 mb-6 text-center">{plan.devices}</p>

                  <div className="mb-6 p-4 bg-white/5 rounded-xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-300">{plan.price}</div>
                      <div className="text-sm opacity-70 mt-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Response: {plan.responseTime}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.includes.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <a
                      href={`${whatsappLink}&text=I'm%20interested%20in%20the%20${plan.name}%20IT%20Support%20plan`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 rounded-full font-bold text-center ${plan.popular ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700' : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'} transition-colors`}
                    >
                      Get This Plan
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

          {/* Pay-Per-Incident Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-2xl p-8 border border-blue-500/30"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                  <Wrench className="w-4 h-4 text-blue-300" />
                  <span className="font-bold">PAY-PER-INCIDENT OPTION</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Need One-Time IT Support?</h3>
                <p className="text-gray-300">
                  Don't need monthly support? We offer pay-per-incident services for one-time IT issues, 
                  setup, or consultations. Perfect for occasional needs.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">From KES 2,500</div>
                <div className="text-sm opacity-80 mb-4">Per incident/visit</div>
                <a
                  href={`${whatsappLink}&text=I%20need%20one-time%20IT%20support`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-bold hover:from-blue-700 hover:to-cyan-700 transition-colors whitespace-nowrap"
                >
                  Request One-Time Service
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our{" "}
              <span className="text-amber-300">IT Support Services</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive IT services to keep your technology running smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicesOffered.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition-all h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/20 mb-4">
                  <div className="text-yellow-400">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Benefits of{" "}
              <span className="text-green-300">Our IT Support</span>
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
      <section className="py-20 bg-gradient-to-r from-amber-900/20 to-yellow-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Industries We Support in{" "}
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

      {/* On-Demand Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-cyan-300">On-Demand IT Services</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left - Repair Services */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold mb-6 text-cyan-300">
                  <Wrench className="inline w-6 h-6 mr-2" />
                  Device Repair Services
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { device: "Laptops", price: "KES 1,500+" },
                    { device: "Desktops", price: "KES 2,000+" },
                    { device: "Printers", price: "KES 1,000+" },
                    { device: "Servers", price: "KES 5,000+" }
                  ].map((service, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="font-bold mb-2">{service.device}</div>
                      <div className="text-sm text-cyan-300">{service.price}</div>
                      <div className="text-xs opacity-70 mt-1">Diagnosis + Repair</div>
                    </div>
                  ))}
                </div>
                <a
                  href={`${whatsappLink}&text=I%20need%20device%20repair%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-6 py-3 bg-cyan-600 rounded-full font-bold text-center hover:bg-cyan-700 transition-colors"
                >
                  Request Device Repair
                </a>
              </motion.div>

              {/* Right - Setup Services */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-300">
                  <Settings className="inline w-6 h-6 mr-2" />
                  Setup & Installation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { service: "New PC Setup", price: "KES 1,500/device" },
                    { service: "Software Install", price: "KES 500/app" },
                    { service: "Network Setup", price: "KES 3,000+" },
                    { service: "Data Migration", price: "KES 2,500+" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="font-bold mb-2">{item.service}</div>
                      <div className="text-sm text-purple-300">{item.price}</div>
                      <div className="text-xs opacity-70 mt-1">One-time service</div>
                    </div>
                  ))}
                </div>
                <a
                  href={`${whatsappLink}&text=I%20need%20setup%20%26%20installation%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-6 py-3 bg-purple-600 rounded-full font-bold text-center hover:bg-purple-700 transition-colors"
                >
                  Request Setup Service
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Free IT Assessment */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-3xl p-12 text-center border border-yellow-500/30"
          >
            <h2 className="text-4xl font-bold mb-6">
              Get a{" "}
              <span className="text-yellow-300">Free IT Assessment</span>
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let our experts analyze your IT infrastructure and provide recommendations
              to improve performance, security, and reliability.
            </p>

            {/* What's Included */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "Comprehensive system health check",
                "Security vulnerability assessment",
                "Performance optimization review",
                "Backup & recovery evaluation",
                "IT budget analysis",
                "Detailed report with recommendations"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${whatsappLink}&text=I%20want%20a%20FREE%20IT%20Assessment`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
              >
                🎯 Request Free IT Assessment
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                📞 Call for Immediate Help
              </a>
            </div>

            <p className="mt-8 text-sm opacity-70">
              <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
              No obligation • Professional assessment • Detailed report included
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Contact */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-lg font-bold mb-2">GetAxe.Tech IT Support & Maintenance</div>
              <p className="text-sm opacity-80">Professional IT support services across Kenya</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-600 rounded-full font-bold hover:bg-yellow-700 transition-colors"
              >
                <Headphones className="w-5 h-5" />
                IT Support: {phoneNumber}
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full font-bold hover:bg-green-700 transition-colors"
              >
                <span>💬</span>
                WhatsApp for Support
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm opacity-70">
            Emergency support available 24/7 • Response within 30 minutes for critical issues
          </div>
        </div>
      </div>
    </div>
  );
}