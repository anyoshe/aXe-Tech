"use client";  
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Laptop, 
  Network, 
  Server, 
  Layers, 
  Wrench, 
  Shield, 
  Zap, 
  DollarSign,
  Users,
  Building,
  School,
  TrendingUp
} from "lucide-react";

export default function ICTOverview() {
  const solutions = [
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "ICT Hardware Supply",
      description: "Quality laptops, computers, tablets, printers, and projectors at competitive prices",
      value: "Cost-effective procurement with warranty support",
      features: ["Bulk pricing", "Warranty included", "Quality assurance", "Delivery & setup"],
      price: "From KSh 5,500",
      link: "/ict-products",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Mobile Computer Labs",
      description: "Portable, fully-equipped ICT labs for schools without permanent infrastructure",
      value: "80% cost savings vs traditional labs",
      features: ["From 10 laptops + charging cart", "Pre-installed software", "Training included", "Flexible deployment"],
      price: "From KSh 10,000/month",
      link: "/mobile-lab",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "School ERP & Management Systems",
      description: "Comprehensive software for administration, finance, academics, and communication",
      value: "Automate 90% of manual processes",
      features: ["Fee management", "Student portal", "Exam processing", "Parent communication"],
      price: "From KSh 25,000/year",
      link: "/school-erp",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Networking & Infrastructure",
      description: "Complete network setup, WiFi, security systems, and structured cabling",
      value: "Reliable connectivity for 100+ devices",
      features: ["Structured cabling", "WiFi coverage", "Security systems", "24/7 monitoring"],
      price: "Custom packages",
      link: "/networking",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "IT Support & Maintenance",
      description: "Ongoing technical support, repairs, and optimization services",
      value: "Reduce downtime by 95%",
      features: ["Device repairs", "Software updates", "Network maintenance", "Remote support"],
      price: "Custom packages",
      link: "/it-support",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Digital Services Suite",
      description: "Complete digital transformation including branding, websites, and marketing",
      value: "All-in-one digital presence solution",
      features: ["Website development", "Brand identity", "Digital marketing", "UI/UX design"],
      price: "Custom packages",
      link: "/digital-services",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "20+", label: "Schools Served", icon: <School className="w-6 h-6" /> },
    { number: "1,000+", label: "Devices Deployed", icon: <Laptop className="w-6 h-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "50%", label: "Cost Savings", icon: <DollarSign className="w-6 h-6" /> }
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-[var(--color-bg-dark)] to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Complete ICT Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your institution or business with affordable, reliable technology solutions 
            that deliver <span className="text-[var(--color-accent)] font-semibold">real value and measurable results</span>
          </p>
          
          {/* Value Proposition */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <div className="flex justify-center mb-2 text-[var(--color-accent)]">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-[var(--color-accent)] transition-all duration-500 hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="text-[var(--color-accent)] mb-4">
                  {solution.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-accent)] transition-colors">
                  {solution.title}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm leading-relaxed flex-grow">
                  {solution.description}
                </p>

                {/* Value Proposition */}
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                    <Zap className="w-4 h-4" />
                    {solution.value}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4 space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-white">{solution.price}</span>
                    <Link 
                      href={solution.link}
                      className="px-4 py-2 bg-[var(--color-accent)] text-black rounded-lg text-sm font-semibold hover:bg-[var(--color-accent)]/90 transition-colors"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Ready to Transform Your ICT Infrastructure?
          </h2>
          <p className="text-gray-800 mb-6 text-lg max-w-2xl mx-auto">
            Get a free consultation and discover how our solutions can save you money while boosting efficiency
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Free Consultation
            </Link>
            <Link 
              href="/ict-products"
              className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-black"
            >
              Browse Products
            </Link>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-8 text-sm">
            Trusted by schools, businesses, and institutions across Kenya
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <Users className="w-8 h-8 text-gray-400" />
            <Building className="w-8 h-8 text-gray-400" />
            <School className="w-8 h-8 text-gray-400" />
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}