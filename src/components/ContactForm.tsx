'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaLaptop, 
  FaArrowRight,
  FaClock 
} from 'react-icons/fa';
import { 
  MessageCircle, 
  Mail,
  CheckCircle 
} from 'lucide-react';

export default function ContactForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        contact: '',
        organization: '',
        service: '',
        budget: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    // ADD THIS: State to track when component is mounted
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
    setIsMounted(true);
     }, []);



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setIsSubmitted(true);
                setForm({ 
                    name: '', 
                    email: '', 
                    contact: '', 
                    organization: '',
                    service: '',
                    budget: '',
                    message: '' 
                });
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (err) {
            console.error('Submission error:', err);
            alert('Something went wrong. Please call or WhatsApp us directly for immediate assistance.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const services = [
        { value: '', label: 'Select Service Needed' },
        { value: 'laptops-computers', label: 'Laptops & Computers Supply' },
        { value: 'mobile-labs', label: 'Mobile Computer Labs' },
        { value: 'networking', label: 'Networking & Infrastructure' },
        { value: 'school-erp', label: 'School ERP Systems' },
        { value: 'it-support', label: 'IT Support & Maintenance' },
        { value: 'printers-projectors', label: 'Printers & Projectors' },
        { value: 'software-deployment', label: 'Software Deployment' },
        { value: 'digital-services', label: 'Digital Services (Web, Branding)' },
        { value: 'consultation', label: 'ICT Consultation' },
        { value: 'other', label: 'Other ICT Needs' }
    ];

    const budgets = [
        { value: '', label: 'Select Budget Range' },
        { value: 'under-50k', label: 'Under KSh 50,000' },
        { value: '50k-100k', label: 'KSh 50,000 - 100,000' },
        { value: '100k-250k', label: 'KSh 100,000 - 250,000' },
        { value: '250k-500k', label: 'KSh 250,000 - 500,000' },
        { value: '500k-1m', label: 'KSh 500,000 - 1,000,000' },
        { value: 'over-1m', label: 'Over KSh 1,000,000' },
        { value: 'quote-needed', label: 'Need Quote' }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };
// Show loading state until mounted
if (!isMounted) {
    return (
        <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-700 rounded w-2/3 mx-auto mb-12"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 p-8 rounded-2xl space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-700 rounded"></div>
                            ))}
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gray-800 p-8 rounded-2xl h-48"></div>
                            <div className="bg-gray-800 p-6 rounded-2xl h-32"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

    // Success message component
    if (isSubmitted) {
        return (
            <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-800/50 backdrop-blur-sm p-12 rounded-2xl border border-green-500/30 shadow-2xl"
                    >
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
                        <p className="text-xl text-gray-300 mb-6">
                            Your inquiry has been sent directly to <span className="text-[var(--color-accent)] font-semibold">hello@getaxe.tech</span>.
                        </p>
                        <p className="text-gray-400 mb-6">
                            Our ICT team will contact you within 24 hours to discuss your technology needs.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Send Another Inquiry
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Get Your{' '}
                        <span className="bg-gradient-to-r from-[var(--color-accent)] to-purple-500 bg-clip-text text-transparent">
                            ICT Solutions Quote
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Whether you need laptops for your school, networking for your office, or complete ICT setup — 
                        we provide affordable, reliable technology solutions tailored to your needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FaLaptop className="text-[var(--color-accent)] text-2xl" />
                            <h2 className="text-2xl font-bold">Request ICT Quote</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name *"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address *"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="contact"
                                        placeholder="Phone/WhatsApp *"
                                        value={form.contact}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="organization"
                                        placeholder="School/Business Name"
                                        value={form.organization}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <select
                                    name="service"
                                    value={form.service}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                                >
                                    {services.map(service => (
                                        <option key={service.value} value={service.value}>
                                            {service.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    name="budget"
                                    value={form.budget}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300"
                                >
                                    {budgets.map(budget => (
                                        <option key={budget.value} value={budget.value}>
                                            {budget.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    rows={4}
                                    placeholder="Tell us about your ICT needs, number of devices required, timeline, and any specific requirements..."
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-300 resize-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-[var(--color-accent)] to-purple-600 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    'Sending to hello@getaxe.tech...'
                                ) : (
                                    <>
                                        Get Free ICT Consultation
                                        <FaArrowRight className="text-sm" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="space-y-6"
                    >
                        {/* Quick Contact */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <MessageCircle className="text-[var(--color-accent)] text-2xl" />
                                <h2 className="text-2xl font-bold">Quick Connect</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <a
                                    href="https://wa.me/254736889880"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-green-600/20 border border-green-500/30 rounded-xl hover:bg-green-600/30 transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                                        <FaWhatsapp className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">WhatsApp Quote</div>
                                        <div className="text-sm text-gray-300">Instant pricing & support</div>
                                    </div>
                                </a>

                                <a
                                    href="tel:+254736889880"
                                    className="flex items-center gap-4 p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                                        <FaPhoneAlt className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Call Our Team</div>
                                        <div className="text-sm text-gray-300">+254 736 889 880</div>
                                    </div>
                                </a>

                                <a
                                    href="mailto:hello@getaxe.tech"
                                    className="flex items-center gap-4 p-4 bg-purple-600/20 border border-purple-500/30 rounded-xl hover:bg-purple-600/30 transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                                        <Mail className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Email Us</div>
                                        <div className="text-sm text-gray-300">hello@getaxe.tech</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <CheckCircle className="text-[var(--color-accent)]" />
                                Why Schools & Businesses Choose Us
                            </h3>
                            <div className="space-y-3 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                                    <span>100+ Educational Institutions Served</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                                    <span>Quality ICT Hardware with Warranty</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                                    <span>Complete Setup & After-Sales Support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></div>
                                    <span>Affordable Pricing for Schools & SMEs</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Hours */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <FaClock className="text-[var(--color-accent)]" />
                                Service Hours
                            </h3>
                            <div className="text-sm text-gray-300 space-y-2">
                                <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                                <div>Sun: 9:00 AM - 2:00 PM</div>
                                <div className="text-[var(--color-accent)] font-medium">
                                    WhatsApp: 24/7 for urgent inquiries
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}