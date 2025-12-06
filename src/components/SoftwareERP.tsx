"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Server,
  Database,
  Users,
  CreditCard,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
  Building,
  ShoppingBag,
  TrendingUp,
  Clock,
  Settings,
  Cloud,
  Smartphone,
  Package
} from "lucide-react";

export default function SoftwareERPPage() {
  const phoneNumber = "0736889880";
  const whatsappLink = `https://wa.me/254736889880?text=Hello%20GetAxe,%20I'm%20interested%20in%20Software%20%26%20ERP%20solutions`;

  const painPoints = [
    "Manual processes slowing down your business?",
    "Multiple systems that don't talk to each other?",
    "Inventory management becoming chaotic?",
    "Financial reporting taking days instead of minutes?",
    "Customer data scattered across different platforms?"
  ];

  const solutions = [
    {
      category: "Business Management",
      icon: <Building className="w-6 h-6" />,
      systems: [
        "ERP (Enterprise Resource Planning)",
        "CRM (Customer Relationship Management)",
        "HRM (Human Resource Management)",
        "Inventory & Supply Chain"
      ]
    },
    {
      category: "Financial Systems",
      icon: <CreditCard className="w-6 h-6" />,
      systems: [
        "Accounting Software",
        "Point of Sale (POS)",
        "Invoicing & Billing",
        "Payroll Management"
      ]
    },
    {
      category: "Industry Specific",
      icon: <ShoppingBag className="w-6 h-6" />,
      systems: [
        "School Management Systems",
        "Hospital Management Systems",
        "Hotel Management Systems",
        "Manufacturing ERP"
      ]
    },
    {
      category: "Cloud Services",
      icon: <Cloud className="w-6 h-6" />,
      systems: [
        "Cloud Migration",
        "Software as a Service (SaaS)",
        "Data Backup Solutions",
        "Remote Access Systems"
      ]
    }
  ];

  const erpPackages = [
    {
      name: "Startup ERP",
      idealFor: "Small businesses, startups",
      users: "Up to 5 users",
      modules: [
        "Basic accounting",
        "Inventory management",
        "Customer management",
        "Basic reporting",
        "Email support",
        "Cloud hosting included"
      ],
      price: "KES 25,000",
      setupFee: "KES 15,000",
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Business ERP",
      idealFor: "Medium businesses, schools",
      users: "Up to 20 users",
      modules: [
        "Full accounting suite",
        "Inventory with barcode",
        "CRM with sales pipeline",
        "HR & payroll module",
        "Advanced analytics",
        "Mobile app access",
        "Priority support",
        "Training sessions"
      ],
      price: "KES 65,000/month",
      setupFee: "KES 45,000",
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Enterprise ERP",
      idealFor: "Large organizations, chains",
      users: "Unlimited users",
      modules: [
        "Customized workflow",
        "Multi-branch management",
        "API integration",
        "Business intelligence",
        "24/7 dedicated support",
        "Custom development",
        "Regular updates",
        "Security audits",
        "Disaster recovery"
      ],
      price: "KES 150,000+/month",
      setupFee: "Custom",
      popular: false,
      color: "from-orange-500 to-red-500"
    }
  ];

  const softwareSolutions = [
    {
      title: "School ERP",
      description: "Complete school management system",
      icon: <Users className="w-6 h-6" />,
      features: ["Student management", "Fee collection", "Exam management", "Parent portal"],
      price: "From KES 40,000/month"
    },
    {
      title: "Retail POS",
      description: "Point of sale for shops & supermarkets",
      icon: <CreditCard className="w-6 h-6" />,
      features: ["Barcode scanning", "Inventory tracking", "Sales reports", "Receipt printing"],
      price: "From KES 20,000/month"
    },
    {
      title: "Hospital System",
      description: "Healthcare management solution",
      icon: <Shield className="w-6 h-6" />,
      features: ["Patient records", "Appointment scheduling", "Pharmacy management", "Lab integration"],
      price: "From KES 75,000/month"
    },
    {
      title: "Custom Software",
      description: "Tailored solutions for unique needs",
      icon: <Settings className="w-6 h-6" />,
      features: ["Requirements analysis", "Custom development", "Testing & deployment", "Maintenance"],
      price: "Custom quote"
    }
  ];

  const deploymentProcess = [
    {
      step: "1",
      title: "Discovery & Analysis",
      description: "Understand your business needs and processes",
      icon: <Package className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Solution Design",
      description: "Design the perfect system for your requirements",
      icon: <Settings className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Deployment & Training",
      description: "Install, configure, and train your team",
      icon: <Server className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Support & Optimization",
      description: "Ongoing support and system improvements",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      title: "80% Efficiency Gain",
      description: "Automate manual processes",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      title: "Real-time Insights",
      description: "Make data-driven decisions",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      title: "Cost Reduction",
      description: "Reduce operational costs by 30%",
      icon: <CreditCard className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Scalable Growth",
      description: "Systems that grow with your business",
      icon: <Zap className="w-6 h-6" />,
      color: "text-amber-400"
    }
  ];

  const industriesServed = [
    "Education (Schools/Universities)",
    "Retail & Wholesale",
    "Healthcare",
    "Manufacturing",
    "Hospitality",
    "Logistics & Transport",
    "Non-Profit Organizations",
    "Government Agencies"
  ];

  const stats = [
    { value: "200+", label: "ERP Systems Deployed" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "40%", label: "Avg. Cost Reduction" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 hover:text-purple-300 transition-colors"
              >
                <Server className="w-4 h-4" />
                <span className="font-bold">ERP Experts: {phoneNumber}</span>
              </a>
              <div className="hidden md:flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>Custom Software Development Available</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>✅ Free Consultation • Demo Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30 z-0" />
        <div className="absolute inset-0 bg-[url('/data-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Expert Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-pink-700 rounded-full px-6 py-3 mb-8 border border-purple-500/50">
              <Database className="w-5 h-5" />
              <span className="font-bold">CERTIFIED ERP & SOFTWARE EXPERTS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Transform Your Business with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Software & ERP Systems
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Affordable ERPs, accounting systems, POS, school management, and custom software solutions 
              for Kenyan businesses. <span className="text-purple-300 font-semibold">Streamline operations and boost efficiency.</span>
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-purple-300">{stat.value}</div>
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
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                <div className="flex items-center justify-center gap-3">
                  <Server className="w-5 h-5" />
                  Book Free ERP Demo
                </div>
              </a>
              <Link
                href="#solutions"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                View Solutions
              </Link>
            </div>

            {/* Quick Call CTA */}
            <div className="mt-8">
              <a 
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 text-lg hover:text-purple-300 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Need immediate consultation? Call: <strong>{phoneNumber}</strong></span>
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
              {/* Left - Manual Problems */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl p-8 border border-red-500/30"
              >
                <h2 className="text-3xl font-bold mb-6 text-red-300">
                  The Cost of Manual Processes
                </h2>
                <div className="space-y-4">
                  {painPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-300">✗</span>
                      </div>
                      <span className="text-lg">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-black/30 rounded-xl">
                  <div className="text-xl font-bold text-red-300">Average Cost: 20-30% of revenue lost to inefficiencies</div>
                </div>
              </motion.div>

              {/* Right - Software Solutions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-2xl p-8 border border-green-500/30"
              >
                <h2 className="text-3xl font-bold mb-6 text-green-300">
                  Our Software Solutions
                </h2>
                <div className="space-y-6">
                  {[
                    "Automate 80% of manual processes",
                    "Single system for all operations",
                    "Real-time inventory tracking",
                    "Instant financial reporting",
                    "Centralized customer database"
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
                  <div className="text-2xl font-bold text-green-300 mb-2">Increase Efficiency by 80%</div>
                  <p className="text-sm opacity-80">See results within first 30 days</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Categories */}
      <section id="solutions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Software Solutions for{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Every Need
              </span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive software solutions tailored to your industry and requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all h-full"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 mb-6 mx-auto">
                  <div className="text-purple-400">
                    {solution.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{solution.category}</h3>
                <ul className="space-y-3">
                  {solution.systems.map((system, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {system}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ERP Packages */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ERP{" "}
              <span className="text-purple-300">Packages</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Complete business management solutions at affordable prices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {erpPackages.map((pkg, idx) => (
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
                  <p className="text-sm opacity-70 mb-6 text-center">{pkg.users}</p>

                  <div className="mb-6 p-4 bg-white/5 rounded-xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-300">{pkg.price}</div>
                      <div className="text-sm opacity-70 mt-2">
                        Setup: {pkg.setupFee}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.modules.map((module, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{module}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <a
                      href={`${whatsappLink}&text=I'm%20interested%20in%20the%20${pkg.name}%20ERP%20package`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 rounded-full font-bold text-center ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} transition-colors`}
                    >
                      Get This ERP Package
                    </a>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="block w-full py-3 bg-white/10 rounded-full font-bold text-center hover:bg-white/20 transition-colors text-sm"
                    >
                      Call for Demo: {phoneNumber}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Industry-Specific{" "}
              <span className="text-cyan-300">Solutions</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Tailored software solutions for different industries in Kenya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {softwareSolutions.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/20 mb-4">
                  <div className="text-cyan-400">
                    {solution.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                <p className="text-gray-300 mb-4">{solution.description}</p>
                <ul className="space-y-2 mb-4">
                  {solution.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-lg font-bold text-cyan-300">{solution.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Process */}
      <section className="py-20 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our{" "}
              <span className="text-yellow-300">4-Step Deployment Process</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Smooth implementation from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {deploymentProcess.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-amber-600 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {step.step}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 mb-4">
                  <div className="text-purple-400">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
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
              <span className="text-green-300">Our Software Solutions</span>
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

      {/* Custom Development */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-2xl p-8 border border-amber-500/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                    <Settings className="w-4 h-4 text-amber-300" />
                    <span className="font-bold">CUSTOM SOFTWARE DEVELOPMENT</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Need a Custom Solution?</h3>
                  <p className="text-gray-300">
                    We develop custom software solutions tailored to your unique business processes. 
                    From mobile apps to complex enterprise systems, we build exactly what you need.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-amber-300">4-12 weeks</div>
                      <div className="text-sm opacity-80">Development timeline</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-300">100%</div>
                      <div className="text-sm opacity-80">Requirements match</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href={`${whatsappLink}&text=I%20need%20custom%20software%20development`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full font-bold hover:from-amber-700 hover:to-yellow-700 transition-colors whitespace-nowrap"
                  >
                    Request Custom Development
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
            className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-3xl p-12 text-center border border-white/10"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free consultation and demo to see how our software solutions can streamline your operations
            </p>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: "🎯",
                  title: "Free Demo",
                  action: "Book Now",
                  link: whatsappLink,
                  color: "from-purple-600 to-pink-600"
                },
                {
                  icon: "📞",
                  title: "Consultation",
                  action: phoneNumber,
                  link: `tel:${phoneNumber}`,
                  color: "from-indigo-600 to-blue-600"
                },
                {
                  icon: "💬",
                  title: "Quick Quote",
                  action: "Get Pricing",
                  link: whatsappLink,
                  color: "from-cyan-600 to-teal-600"
                }
              ].map((option, idx) => (
                <a
                  key={idx}
                  href={option.link}
                  target={option.title !== "Consultation" ? "_blank" : undefined}
                  rel={option.title !== "Consultation" ? "noopener noreferrer" : undefined}
                  className={`bg-gradient-to-r ${option.color} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-3xl mb-4">{option.icon}</div>
                  <div className="text-xl font-bold mb-2">{option.title}</div>
                  <div className="text-lg">{option.action}</div>
                </a>
              ))}
            </div>

            {/* Free Assessment Offer */}
            <div className="p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30 mb-8">
              <h3 className="text-2xl font-bold mb-4">
                <CheckCircle className="inline w-6 h-6 mr-2 text-green-300" />
                Free Business Process Analysis
              </h3>
              <p className="text-lg mb-4">
                Get a comprehensive analysis of your current processes and a detailed report 
                on how software can optimize your operations and save you money.
              </p>
              <a
                href={`${whatsappLink}&text=I%20want%20a%20FREE%20Business%20Process%20Analysis`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                🎯 Claim Free Business Analysis
              </a>
            </div>

            <p className="mt-8 text-sm opacity-70">
              <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
              No obligation • Live demo • Detailed proposal included
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Contact */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-lg font-bold mb-2">GetAxe.Tech Software & ERP Solutions</div>
              <p className="text-sm opacity-80">Transform your business with intelligent software solutions</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-full font-bold hover:bg-purple-700 transition-colors"
              >
                <Server className="w-5 h-5" />
                ERP Consultation: {phoneNumber}
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full font-bold hover:bg-green-700 transition-colors"
              >
                <span>💬</span>
                WhatsApp for Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}