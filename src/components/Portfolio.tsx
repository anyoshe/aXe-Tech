"use client";

// import Image from "next/image";

type PortfolioItem = {
  title: string;
  image: string;
  link?: string;
  description?: string;
  status?: "Live" | "Unpublished" | "Prototype" | "Concept";
  type?: "Landing Page" | "E-commerce" | "Design" | "Web App" | "Full-Stack Web App";
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "SaaS Dashboard UI",
    image: "/samples/portfolio2.jpg",
    description: "Admin dashboard design for a SaaS product — focused on clean layout and dark mode UX.",
    status: "Concept",
    type: "Design",
  },
  {
    title: "Fashion E-Commerce Store",
    image: "/samples/portfolio1.jpg",
    description: "Complete landing + product detail page for a boutique fashion brand. Built with Next.js and Tailwind.",
    link: "#", // Replace with live link
    status: "Live",
    type: "E-commerce",
  },
  {
    title: "Startup Landing Page",
    image: "/samples/portfolio3.jpg",
    description: "Hero section, feature highlights, and CTA layout for a stealth-mode startup (unpublished).",
    status: "Unpublished",
    type: "Landing Page",
  },
  {
    title: "Anyoka Eats – Food Delivery Platform",
    image: "/samples/anyoka-eats.jpg",
    description: "A modern food ordering platform with menu browsing, checkout, and admin dashboard built using React and Firebase.",
    status: "Unpublished",
    type: "Full-Stack Web App",
    link: "https://github.com/anyoshe/anyoka_eats",
  },
];

export default function Portfolio() {
  return (
    <section className="py-24 bg-[var(--color-bg-dark)] text-center text-[var(--color-text-main)]">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Recent Work</h2>
        <p className="text-lg text-[var(--color-text-subtle)]">
          Selected projects — from concept to launch-ready designs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {portfolioItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-bg-dark)] border border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="p-5 text-left">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                {item.status && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Live"
                        ? "bg-green-600 text-white"
                        : item.status === "Unpublished"
                        ? "bg-yellow-700 text-yellow-200"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {item.status}
                  </span>
                )}
              </div>

              {item.type && (
                <p className="text-sm text-[var(--color-accent)] mb-2 font-medium">{item.type}</p>
              )}

              {item.description && (
                <p className="text-sm text-white/80 leading-relaxed mb-4">{item.description}</p>
              )}

              {item.link ? (
                <a
                  href={item.link}
                  className="text-[var(--color-accent)] text-sm font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.status === "Unpublished" ? "View Code →" : "View Project →"}
                </a>
              ) : (
                <span className="text-white/50 italic text-sm">Preview not available</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
