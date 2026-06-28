import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import SocialNavbar from "@/components/SocialNavbar";
import NextAuthProvider from "@/components/NextAuthProvider";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getaxekenya.com"),


  title: {
    default: "GetAxe Technologies - ICT Solutions Kenya",
    template: "%s | GetAxe Technologies",
  },
  description:
    "We supply laptops, computers, tablets, printers, networking hardware and full ICT setup for schools, SMEs, NGOs and institutions in Kenya. Mobile computer labs, networking, ERPs, IT maintenance, ICT consulting and digital deployment — affordable and ready to use.",

  keywords: [
    "ICT equipment Kenya",
    "laptop supplier Kenya",
    "computer shop Kenya",
    "ICT solutions Kenya",
    "ICT supplier Nairobi",
    "mobile computer labs Kenya",
    "school ICT equipment",
    "ICT consulting",
    "networking solutions Kenya",
    "ICT hardware for schools",
    "printer supplier Kenya",
    "ERP solutions Kenya",
    "GetAxe ICT",
    "technology supplier Kenya",
  ],

  authors: [{ name: "GetAxe Technologies", url: "https://getaxekenya.com" }],

  // === FAVICON & ICONS (Improved) ===
 icons: {
  // Main favicon for browsers
  icon: [
    { url: "/favicon.ico", sizes: "any" },           // Best if you have it
    { url: "/512x512.png", sizes: "512x512", type: "image/png" },
    { url: "/192x192.png", sizes: "192x192", type: "image/png" },
  ],

  // Apple Touch Icon (you already have this)
  apple: "/apple-touch-icon.png",

  // Shortcut icon
  shortcut: "/favicon.ico",
},
  openGraph: {
    title: "GetAxe Technologies — ICT Equipment & Technology Solutions Kenya",
    description:
      "Trusted supplier of laptops, computers, school ICT labs, networking, ERPs and full technology solutions in Kenya.",
    url: "https://getaxekenya.com",
    siteName: "GetAxe Technologies",
    images: [
      {
        url: "/gat-icon.png",
        width: 1200,
        height: 630,
        alt: "GetAxe Technologies Kenya",
      },
    ],
    type: "website",
    locale: "en_KE",
  },

  twitter: {
    card: "summary_large_image",
    site: "@getaxetech",
    title: "GetAxe Technologies — ICT Solutions Kenya",
    description:
      "Laptops, computers, tablets, printers, networking and ICT labs for schools, SMEs and organizations across Kenya.",
    images: ["/gat-icon.png"],
  },

robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "YfZyhhgRzzhBNsqREcNsPlUrbd8Yvg895OZ4fALCc_8",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="YfZyhhgRzzhBNsqREcNsPlUrbd8Yvg895OZ4fALCc_8"
        />

        {/* ✅ Facebook Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '673031319116971'); 
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ✅ HubSpot Script */}
        <Script
          id="hubspot-script"
          src="//js-eu1.hs-scripts.com/146581672.js"
          strategy="afterInteractive"
        />

        {/* ✅ Facebook Pixel Fallback */}
        <noscript>
          <Image
            src="https://www.facebook.com/tr?id=673031319116971&ev=PageView&noscript=1"
            alt=""
            height={1}
            width={1}
            style={{ display: "none" }}
            unoptimized
          />
        </noscript>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <SocialNavbar />
        <Analytics />
      </body>
    </html>
  );
}