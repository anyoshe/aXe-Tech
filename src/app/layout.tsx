// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "../../styles/globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Axe-Tech",
//   description: "Smart Digital Solutions for Bold Businesses.",
//   icons: {
//     icon: "/axe-Tech.svg", 
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import SocialNavbar from "@/components/SocialNavbar"; // Adjust path as needed

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axe-Tech",
  description: "Smart Digital Solutions for Bold Businesses.",
  icons: {
    icon: "/axe-Tech.svg", // Make sure this path is valid and the image is placed inside /public
  },
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
      </body>
    </html>
  );
}
