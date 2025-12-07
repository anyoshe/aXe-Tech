"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Users, 
  Shield, 
  Truck, 
  Zap, 
  CheckCircle, 
  DollarSign,
  Battery,
  Wifi,
  Laptop,
  BookOpen,
  Repeat,
  Phone,
  MapPin,
  Gift,
  TrendingDown
} from "lucide-react";

export default function MobileLabPage() {
  const phoneNumber = "0736889880";
  const whatsappLink = `https://wa.me/254736889880?text=Hello%20GetAxe,%20I'm%20interested%20in%20your%20Mobile%20Computer%20Lab%20services`;

  const painPoints = [
    "Computer lab setup costs too high for Kenyan schools?",
    "No space for permanent ICT room in your school compound?",
    "Equipment becoming obsolete before you finish paying?",
    "Only need ICT classes 1-2 times per week for different streams?",
    "Can't afford full-time IT staff on school budget?"
  ];

  const benefits = [
    "Pay only when you use it - no fixed monthly costs",
    "Always get latest equipment - no obsolescence worries",
    "Zero maintenance - we handle all repairs and updates",
    "Flexible scheduling - perfect for Kenyan school timetables",
    "Includes qualified ICT teacher if needed",
    "KES Insurance coverage included - no hidden costs"
  ];

  const rentalPlans = [
    {
      name: "Jamii Package",
      frequency: "Mara Moja Weekly",
      sessions: "4 sessions/month",
      includes: [
        "10+ Laptops with charging cart",
        "Wireless internet setup",
        "Basic educational software",
        "On-site setup & pack-up",
        "Basic technical support",
        "KES Insurance included"
      ],
      price: "KES 4,000/session",
      monthlyPrice: "KES 12,000/month",
      monthlyDiscount: "Save KES 4,000",
      popular: false,
      icon: <Calendar className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "Elite Package",
      frequency: "Mara Mbili Weekly",
      sessions: "8 sessions/month",
      includes: [
        "20+ Laptops with charging cart",
        "Smart projector",
        "Full educational software suite",
        "Dedicated ICT teacher option",
        "Priority support",
        "Curriculum materials",
        "KCSE/KCPE exam prep software"
      ],
      price: "KES 3,000/session",
      monthlyPrice: "KES 18,000/month",
      monthlyDiscount: "Save KES 6,000",
      popular: true,
      icon: <Repeat className="w-8 h-8" />,
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "Custom Package",
      frequency: "Your Schedule",
      sessions: "Flexible sessions",
      includes: [
        "30+ Laptops/Tablets",
        "Interactive whiteboard",
        "Full software + LMS access",
        "Qualified ICT teacher included",
        "24/7 emergency support",
        "Progress reporting",
        "Parent reports system"
      ],
      price: "Custom Rate/session",
      monthlyPrice: "Customized/month",
      monthlyDiscount: "Bulk discounts available",
      popular: false,
      icon: <Clock className="w-8 h-8" />,
      color: "from-green-600 to-emerald-600"
    }
  ];

  const monthlyBenefits = [
    "10-20% discount vs pay-per-session",
    "Guaranteed time slots each week",
    "Priority scheduling during exams",
    "Free teacher training sessions",
    "Monthly progress reports",
    "Equipment upgrade priority"
  ];

  const schoolsServed = [
    { 
      name: "Primary Schools", 
      desc: "CBC Computer Activities - 1-2 classes weekly",
      students: "Class 4-8"
    },
    { 
      name: "Secondary Schools", 
      desc: "KCSE Computer Studies - Multiple streams",
      students: "Form 1-4"
    },
    { 
      name: "Vocational Centers", 
      desc: "Computer packages & specialized training",
      students: "TVET Courses"
    },
    { 
      name: "Exam Prep", 
      desc: "KCSE/KCPE computer studies intensive",
      students: "Candidates"
    }
  ];

  const kenyanFeatures = [
    {
      title: "KES Pricing",
      description: "All prices in Kenya Shillings - no dollar conversions",
      icon: "KES"
    },
    {
      title: "Local Support",
      description: "Kenyan ICT teachers & technical staff",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Countrywide",
      description: "Serving schools across Kenya",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: "M-Pesa Ready",
      description: "Convenient mobile payments accepted",
      icon: "MPESA"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-3 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-bold">Call/WhatsApp: {phoneNumber}</span>
              </a>
              <div className="hidden md:flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Serving Schools Across Kenya</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>✅ No Long-Term Contracts • Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Kenya Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-black rounded-full px-6 py-3 mb-8 border border-green-500/50">
              <span className="font-bold">🇰🇪 MADE FOR KENYAN SCHOOLS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Rent A{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Mobile Computer Lab
              </span>{" "}
              For Your School
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Usiambie wazazi hauna computer lab! Get a fully equipped computer lab delivered to your school in Kenya. 
              <span className="text-cyan-300 font-semibold"> Pay per use or save with monthly booking!</span> Perfect for CBC & KCSE computer studies.
            </p>

            {/* Kenyan Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
            >
              {kenyanFeatures.map((feature, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-lg font-bold text-cyan-300 mb-2">
                    {typeof feature.icon === 'string' ? feature.icon : feature.icon}
                  </div>
                  <div className="text-sm opacity-80">{feature.description}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-full font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>💬</span>
                  WhatsApp Us Now
                </div>
              </a>
              <Link
                href="#monthly-discount"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                <div className="flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5" />
                  View Monthly Discounts
                </div>
              </Link>
            </div>

            {/* Quick Call CTA */}
            <div className="mt-8">
              <a 
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 text-lg hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Or call us directly: <strong>{phoneNumber}</strong></span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monthly Discount Section */}
      <section id="monthly-discount" className="py-20 bg-gradient-to-b from-purple-900/20 to-purple-800/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full px-6 py-3 mb-6">
              <Gift className="w-5 h-5" />
              <span className="font-bold text-lg">MONTHLY BOOKING SPECIAL</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Save Up To{" "}
              <span className="text-yellow-300">20%</span> With Monthly Booking
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Book your computer lab sessions monthly and enjoy guaranteed slots plus big discounts!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {rentalPlans.map((plan, idx) => (
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
                      BEST VALUE
                    </div>
                  </div>
                )}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 h-full border border-white/10">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${plan.color} mb-8`} />
                  
                  <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                  <p className="text-gray-300 mb-1 text-center">{plan.frequency}</p>
                  <p className="text-sm opacity-70 mb-6 text-center">{plan.sessions}</p>

                  {/* Regular Price */}
                  <div className="mb-4 p-4 bg-white/5 rounded-xl">
                    <div className="text-sm opacity-70 mb-1">Regular Session Rate:</div>
                    <div className="text-2xl font-bold line-through text-gray-400">{plan.price}</div>
                  </div>

                  {/* Monthly Discount Price */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30">
                    <div className="text-sm opacity-70 mb-1">Monthly Booking Rate:</div>
                    <div className="text-3xl font-bold text-green-300">{plan.monthlyPrice}</div>
                    <div className="text-sm text-yellow-300 font-bold mt-2">
                      <TrendingDown className="inline w-4 h-4 mr-1" />
                      {plan.monthlyDiscount}
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
                      href={`${whatsappLink}&text=I'm%20interested%20in%20the%20${plan.name}%20monthly%20booking`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 rounded-full font-bold text-center ${plan.popular ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'} transition-colors`}
                    >
                      Book Monthly & Save
                    </a>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="block w-full py-3 bg-white/10 rounded-full font-bold text-center hover:bg-white/20 transition-colors text-sm"
                    >
                      Call to Discuss: {phoneNumber}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Monthly Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              <Zap className="inline w-6 h-6 mr-2 text-yellow-300" />
              Why Book Monthly?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-yellow-300">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="text-yellow-300 font-bold">Perfect for Kenyan school terms!</span> Book for the entire term and save even more.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost Comparison for Kenya */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-black/50 rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-8 text-center">
                <span className="text-green-300">Kenyan Schools Save Big:</span> Rental vs Building Lab
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4">Cost</th>
                      <th className="text-center py-4 text-red-300">Building your own lab</th>
                      <th className="text-center py-4 text-green-300">Hiring our Mobile Lab</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Gharama ya Kuanzia", "KES 0.5M - KES 1.5M", "KES 0"],
                      ["Matengenezo Kila Mwezi", "KES 20,000 - KES 50,000", "KES 0"],
                      ["Mshahara wa IT Staff", "KES 20,000 - KES 80,000", "KES 0"],
                      ["Kuboresha Vifaa (Miaka 3)", "KES 500,000 - KES 800,000", "KES 0"],
                      ["Bima ya Vifaa", "KES 30,000/mwaka", "KES 0"],
                      ["Gharama ya Mwezi (8 sessions)", "KES 0", "KES 20,000"]
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="py-4">{row[0]}</td>
                        <td className="text-center py-4">{row[1]}</td>
                        <td className="text-center py-4 font-bold">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-300 text-center">
                  Akiba ya Mwaka: Hadi KES 2.5 Million!
                </div>
                <p className="text-center mt-2 opacity-80">
                  Pesa hii unaweza kutumia kwa walimu, ukarabati wa shule, au masomo ya ziada!
                </p>
              </div>

              {/* Term Booking Special */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                      <span className="text-yellow-300">🏆</span>
                      <span className="font-bold">TERM BOOKING SPECIAL</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Book For Whole Term & Save 25%!</h4>
                    <p className="text-gray-300">
                      Secure your computer lab for the entire school term. Guaranteed slots, biggest discount!
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300 mb-2">Save 25%</div>
                    <a
                      href={`${whatsappLink}&text=I'm%20interested%20in%20TERM%20BOOKING%20SPECIAL`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-yellow-600 text-black rounded-full font-bold hover:bg-yellow-700 transition-colors whitespace-nowrap"
                    >
                      WhatsApp for Term Rate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ideal For Kenyan Schools */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-black rounded-full px-6 py-3 mb-6">
              <span className="font-bold">🇰🇪 PERFECT FOR KENYAN EDUCATION SYSTEM</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Designed For{" "}
              <span className="text-yellow-300">Kenyan Schools</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {schoolsServed.map((school, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 to-amber-600 flex items-center justify-center text-xl font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{school.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{school.desc}</p>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 rounded-full px-3 py-1">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{school.students}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CBC/KCSE Focus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/30"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 mb-4">
                  <BookOpen className="w-4 h-4 text-blue-300" />
                  <span className="font-bold">CURRICULUM ALIGNED</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">CBC & KCSE Computer Studies Ready</h3>
                <p className="text-gray-300">
                  Our labs come with software and materials specifically for Kenyan curriculum. 
                  Perfect for CBC digital literacy and KCSE computer studies practicals.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">100%</div>
                <div className="text-sm opacity-80 mb-4">Curriculum Compliant</div>
                <a
                  href={`${whatsappLink}&text=I%20need%20CBC/KCSE%20Computer%20Studies%20lab%20setup`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Ask About Curriculum
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA with Multiple Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-3xl p-12 text-center border border-white/10"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready For Computer Classes?{" "}
              <span className="text-yellow-300">Reach us out!</span>
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Book a free demonstration at your school. See how easy it is to bring ICT to your students.
            </p>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: "💬",
                  title: "WhatsApp",
                  action: "Chat Now",
                  link: whatsappLink,
                  color: "from-green-600 to-green-700"
                },
                {
                  icon: "📞",
                  title: "Call Direct",
                  action: phoneNumber,
                  link: `tel:${phoneNumber}`,
                  color: "from-blue-600 to-cyan-600"
                },
                {
                  icon: "📧",
                  title: "Email",
                  action: "Send Inquiry",
                  link: "mailto:info@getaxe.tech",
                  color: "from-purple-600 to-pink-600"
                }
              ].map((option, idx) => (
                <a
                  key={idx}
                  href={option.link}
                  target={option.title === "WhatsApp" || option.title === "Email" ? "_blank" : undefined}
                  rel={option.title === "WhatsApp" || option.title === "Email" ? "noopener noreferrer" : undefined}
                  className={`bg-gradient-to-r ${option.color} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-3xl mb-4">{option.icon}</div>
                  <div className="text-xl font-bold mb-2">{option.title}</div>
                  <div className="text-lg">{option.action}</div>
                </a>
              ))}
            </div>

            {/* Trial Offer */}
            <div className="p-6 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-xl border border-yellow-500/30 mb-8">
              <h3 className="text-2xl font-bold mb-4">
                <Gift className="inline w-6 h-6 mr-2" />
                First-Time School Special
              </h3>
              <p className="text-lg mb-4">
                Get your first session at <span className="text-yellow-300 font-bold">50% OFF</span>!
                Experience our mobile lab risk-free.
              </p>
              <a
                href={`${whatsappLink}&text=I%20want%20to%20claim%20the%2050%25%20OFF%20first%20session%20offer`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
              >
                🎯 Claim 50% Off Trial Session
              </a>
            </div>

            <p className="mt-8 text-sm opacity-70">
              <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
              Shule za kwanza tu • Nafasi zimebaki chache • Hakuna mkataba wa muda mrefu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Contact */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-lg font-bold mb-2">GetAxe.Tech Mobile Computer Labs</div>
              <p className="text-sm opacity-80">Serving Kenyan Schools Nationwide</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call: {phoneNumber}
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-full font-bold hover:bg-green-700 transition-colors"
              >
                <span>💬</span>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}