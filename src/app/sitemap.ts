import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://getaxekenya.com";

  // Add more internal static page paths here if you have them (e.g., '/about', '/services')
  const routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  return [...routes];
}