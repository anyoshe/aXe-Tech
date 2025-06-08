import React from "react";
import { Briefcase, Palette, PenTool, Mic, Camera } from "lucide-react";

const brandingTypes = [
  {
    title: "Corporate Identity",
    description: "Logo, business cards, letterheads — the complete visual toolkit for your brand.",
    icon: <Briefcase className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Personal Branding",
    description: "Stand out as a freelancer or creator with a look that reflects your personality.",
    icon: <PenTool className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Visual Design Systems",
    description: "Consistent UI kits, brand guides, and scalable assets for teams and startups.",
    icon: <Palette className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Audio & Podcast Branding",
    description: "Craft a distinct audio identity through sound logos, intros, and outros.",
    icon: <Mic className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Video Branding",
    description: "Motion graphics, branded intros/outros, and consistent lower-thirds.",
    icon: <Camera className="w-8 h-8 text-[var(--color-accent)]" />,
  },
];

export default function BrandingHero() {
  return (
    <section  id="branding" className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)]">Branding That Builds Trust</h1>
        <p className="text-lg text-[var(--color-text-subtle)] mb-12 max-w-2xl mx-auto">
          Whether you&apos;re a solo creator or an enterprise team, our branding services are built to elevate your identity, captivate your audience, and spark connection.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {brandingTypes.map((type) => (
            <div
              key={type.title}
              className="bg-[var(--color-bg-dark)] border border-[var(--color-primary)] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col items-start gap-4">
                {type.icon}
                <h3 className="text-2xl font-semibold text-[var(--color-primary)]">{type.title}</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{type.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <a
            href="#contact"
            className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-main)] font-medium py-3 px-6 rounded-full transition"
          >
            Let&apos;s Build Your Brand
          </a>
        </div>
      </div>
    </section>
  );
}
