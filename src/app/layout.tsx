


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import SocialNavbar from "@/components/SocialNavbar"; 
import { Analytics } from "@vercel/analytics/react"; // ✅ Use 'react' not 'next'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://getaxe.tech"), // ✅ Set this to resolve social images
  title: "GetAxe.tech — Web, App, Marketing & Branding Agency for Growth",

  description: "GetAxe helps startups and businesses generate more leads and sales through sharp branding, high‑performing websites/apps, e‑commerce, and data‑driven digital marketing.",
  keywords: [
    "GetAxe",
    "branding agency",
    "web development Nairobi",
    "app development Kenya",
    "digital marketing",
    "e-commerce solutions",
    "lead generation",
    "startup branding",
    "business growth",
    "getaxe",
    "GetAxe Tech",
    "Social Media Marketing",
    "SEO services",
    "content marketing",
    "web design",
    "mobile app development",
    "digital strategy",
    "Kenya web agency",
  ],
  authors: [{ name: "GetAxe", url: "https://getaxe.tech" }],
  openGraph: {
    title: "GetAxe — Precision Tech to Grow Your Business",
    description: "From branding to web/app development, e-commerce, and marketing — we build digital experiences that generate real leads & revenue.",
    url: "https://getaxe.tech",
    siteName: "GetAxe",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "GetAxe digital growth services"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@getaxetech",
    title: "GetAxe — Turn Digital into Leads & Sales",
    description: "Branding • Web & App Dev • E-commerce • Digital Marketing",
    images: ["/GetAxe.Tech.png"]
  },
  icons: {
    icon: "/favicon.ico",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        {children}
        <SocialNavbar /> {/* 👈 Sticky Social Icons visible on every page */}
        <Analytics /> {/* ✅ Vercel Analytics for tracking */}
      </body>
    </html>
  );
}
