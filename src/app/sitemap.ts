// import { MetadataRoute } from "next";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseUrl = "https://getaxekenya.com";

//   const routes = [
//     "",                    // homepage
//     "/brand-gallary",
//     "/branding",
//     "/computer-lab-setup",
//     "/contactus",
//     "/content",
//     "/designing",
//     "/development",
//     "/digital-services",
//     "/digital-talk",
//     "/ecommerce",
//     "/ict-products",
//     "/ict-solutions",
//     "/it-support",
//     "/landing-showcase",
//     "/lead-gen",
//     "/marketing",
//     "/marketingshowcase",
//     "/mobile-lab",
//     "/networking",
//     "/portfolios",
//     "/school-erp",
//     "/school-erp/demo",
//     "/shop",
//     "/software-erp",
//     // Add any other public pages here
//   ].map((route) => ({
//     url: `${baseUrl}${route}`,
//     lastModified: new Date().toISOString(),
//     changeFrequency: "weekly" as const,
//     priority: route === "" ? 1.0 : 0.7,
//   }));

//   return [...routes];
// }

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://getaxekenya.com";

  const routes = [
    // Main pages
    { url: "", priority: 1.0 },
    { url: "/shop", priority: 0.9 },
    { url: "/contactus", priority: 0.9 },
    
    // Services & Solutions
    { url: "/ict-solutions", priority: 0.8 },
    { url: "/digital-services", priority: 0.8 },
    { url: "/school-erp", priority: 0.8 },
    { url: "/software-erp", priority: 0.8 },
    { url: "/it-support", priority: 0.8 },
    { url: "/networking", priority: 0.8 },
    
    // Other important pages
    { url: "/branding", priority: 0.7 },
    { url: "/ecommerce", priority: 0.7 },
    { url: "/development", priority: 0.7 },
    { url: "/designing", priority: 0.7 },
    { url: "/marketing", priority: 0.7 },
    { url: "/computer-lab-setup", priority: 0.7 },
    { url: "/mobile-lab", priority: 0.7 },
    { url: "/ict-products", priority: 0.7 },
    { url: "/portfolios", priority: 0.7 },
    { url: "/brand-gallary", priority: 0.6 },
    { url: "/marketingshowcase", priority: 0.6 },
    { url: "/landing-showcase", priority: 0.6 },
    { url: "/digital-talk", priority: 0.6 },
    { url: "/lead-gen", priority: 0.6 },
    { url: "/content", priority: 0.6 },
    
    // Demo pages
    { url: "/school-erp/demo", priority: 0.7 },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  return routes;
}