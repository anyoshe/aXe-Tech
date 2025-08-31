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
  title: "GetAxe.tech — Branding, Web, Marketing & Lead Generation Agency",
  description:
    "GetAxe helps startups and businesses generate more leads and sales through sharp branding, high-performing websites/apps, e-commerce, and data-driven digital marketing — including specialized lead generation from solar, power back-up solutions to high-ticket services and many more industries.",
  keywords: [
    "GetAxe",
    "branding agency",
    "web development Nairobi",
    "app development Kenya",
    "digital marketing",
    "e-commerce solutions",
    "lead generation",
    "qualified leads",
    "solar leads",
    "power backup leads",
    "high ticket leads",
    "startup branding",
    "business growth",
    "GetAxe Tech",
    "SEO services",
  ],
  authors: [{ name: "GetAxe", url: "https://getaxe.tech" }],
  openGraph: {
    title: "GetAxe — Precision Tech to Grow Your Business",
    description:
      "From branding to web/app development, e-commerce, and marketing — we build digital experiences that generate real leads & revenue.",
    url: "https://getaxe.tech",
    siteName: "GetAxe",
    images: [
      {
        url: "/gat-icon.png",
        width: 1200,
        height: 630,
        alt: "GetAxe digital growth services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@getaxetech",
    title: "GetAxe — Turn Digital into Leads & Sales",
    description: "Branding • Web & App Dev • E-commerce • Digital Marketing",
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
