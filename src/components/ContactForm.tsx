'use client';

import { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaFacebookMessenger } from 'react-icons/fa';

export default function ContactForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        contact: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('https://formspree.io/f/xwpbbavl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert('Thanks! We’ll respond within 24 hours.');
                setForm({ name: '', email: '', contact: '', message: '' });
            } else {
                alert('There was an issue. Please try again.');
            }
        } catch (err) {
             console.error('Submission error:', err);
            alert('Something went wrong. Try again later.');
        }
    };

    return (
        <section className="w-full bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center px-4 py-8 md:overflow-hidden">
            <div className="w-full max-w-5xl flex flex-col items-center gap-6">
                {/* Shared Header */}
                <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 max-w-md md:max-w-none">
                    Launch the Conversation
                </h1>
                <div className="w-full flex flex-col md:flex-row items-stretch gap-8">
                    {/* Left Section: Contact Form */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700/50 space-y-4 flex flex-col">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-center">
                                    Let’s Connect
                                </h2>
                                <p className="text-center text-gray-300 mt-2 text-sm">
                                    Share your project details, and we’ll respond within{' '}
                                    <span className="text-blue-400 font-semibold">24 hours</span>.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3 flex-grow">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="contact"
                                        placeholder="Phone or WhatsApp"
                                        value={form.contact}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        placeholder="Tell us about your project..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Section: Contact Info */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700/50 space-y-4 flex flex-col">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-center">
                                    Start a Conversation
                                </h2>
                                <p className="text-center text-gray-300 mt-2 text-sm">
                                    Need an instant response? Connect with us directly for real-time discussions.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-3 flex-grow">
                                <a
                                    href="tel:+254736889880"
                                    className="flex items-center gap-2 w-full justify-center bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
                                >
                                    <FaPhoneAlt /> Call Us
                                </a>
                                <a
                                    href="https://m.me/getaxe.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 w-full justify-center bg-blue-700 hover:bg-blue-600 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
                                >
                                    <FaFacebookMessenger /> Message Us
                                </a>

                                <a
                                    href="https://wa.me/254736889880"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 w-full justify-center bg-green-600 hover:bg-green-500 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
                                >
                                    <FaWhatsapp /> WhatsApp
                                </a>
                                <div className="text-center text-gray-400 mt-3">
                                    <p className="text-sm">
                                        <strong>Why GetAxe.Tech?</strong> We deliver bold digital solutions with speed and precision, trusted by innovators worldwide.
                                    </p>
                                    <p className="text-sm mt-2">
                                        <strong>Availability:</strong> Mon-Fri, 9 AM - 6 PM (EAT). WhatsApp us anytime for quick replies!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}