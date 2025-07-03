// components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">GETAXE.TECH</h3>
          <p className="text-gray-400 leading-relaxed">
            Bold digital experiences. Seamless code. Cutting-edge design. 
            We craft brands & build tools that convert.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-medium mb-3">Explore</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><Link href="#services" className="hover:text-blue-400 transition">Services</Link></li>
            <li><Link href="#projects" className="hover:text-blue-400 transition">Projects</Link></li>
            <li><Link href="/contactus" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-medium mb-3">Solutions</h4>
          <ul className="space-y-2">
            <li>Web & App Development</li>
            <li>UI/UX Design</li>
            <li>Brand Identity</li>
            <li>Social Media & Digital Marketing</li>
            <li>SEO & Performance</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-3">Let’s Talk</h4>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:hello@getaxe.tech" className="hover:text-blue-400 transition">hello@getaxe.tech</a></li>
            <li>Phone: <a href="tel:+254736889880" className="hover:text-blue-400 transition">+254 736 889 880</a></li>
            <li>Location: Nairobi, Kenya</li>
            <li><Link href="/contactus" className="hover:text-blue-400 transition">Start a Project →</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} GetAxe.Tech. All rights reserved.</p>
        <p className="mt-2">
          Built with precision & love by GetAxe.Tech — Where creativity meets code.
        </p>
      </div>
    </footer>
  );
}
