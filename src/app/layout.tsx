import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import SocialNavbar from "@/components/SocialNavbar";
import { Analytics } from "@vercel/analytics/react"; 
import Image from "next/image";
import Script from "next/script"; // ✅ Import Script

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getaxe.tech"),
  title: "GetAxe.Tech — ICT Equipment, Laptop Supply, School ICT Labs & Technology Solutions Kenya",
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
  authors: [{ name: "GetAxe Technologies", url: "https://getaxe.tech" }],

  openGraph: {
    title: "GetAxe.Tech — Laptops, Computers, ICT Labs & Tech Solutions",
    description:
      "Kenya’s trusted ICT supply and solutions partner — laptops, computers, tablets, printers, networking, school ICT labs, ERPs and full ICT deployment.",
    url: "https://getaxe.tech",
    siteName: "GetAxe Technologies",
    images: [
      {
        url: "/gat-icon.png",
        width: 1200,
        height: 630,
        alt: "ICT equipment, laptops and digital solutions Kenya",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@getaxetech",
    title: "GetAxe.Tech — ICT Products, Laptop Supply & Technology Solutions Kenya",
    description:
      "Laptops, computers, tablets, printers, networking and ICT labs for schools, SMEs and organizations across Kenya.",
    images: ["/gat-icon.png"],
  },

  icons: {
    icon: "/favicon.ico",
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
        {children}
        <SocialNavbar />
        <Analytics />
      </body>
    </html>
  );
}
