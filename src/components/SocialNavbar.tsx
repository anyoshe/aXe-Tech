'use client';

import { FaTwitter, FaLinkedin, FaTiktok, FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

const socials = [
  {
    href: 'https://twitter.com/yourhandle',
    icon: FaTwitter,
    color: 'text-[#1DA1F2]',
    label: 'Twitter',
  },
  {
    href: 'https://www.linkedin.com/in/yourprofile',
    icon: FaLinkedin,
    color: 'text-[#0077B5]',
    label: 'LinkedIn',
  },
  {
    href: 'https://www.tiktok.com/@yourusername',
    icon: FaTiktok,
    color: 'text-white',
    label: 'TikTok',
  },
  {
    href: 'https://instagram.com/yourprofile',
    icon: FaInstagram,
    color: 'text-[#E1306C]',
    label: 'Instagram',
  },
  {
    href: 'https://wa.me/254736889880',
    icon: FaWhatsapp,
    color: 'text-[#25D366]',
    label: 'WhatsApp',
  },
  {
    href: 'https://facebook.com/profile.php?id=61574406256870',
    icon: FaFacebook,
    color: 'text-[#1877F2]',
    label: 'Facebook',
  },
];

export default function SocialNavbar() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-gray-700/50">
      <div className="flex items-center justify-center space-x-5">
        {socials.map(({ href, icon: Icon, color, label }, index) => (
          <Link
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative"
          >
            <Icon
              className={`text-2xl hover:scale-110 transition-transform duration-300 ease-in-out ${color}`}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-xs bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}