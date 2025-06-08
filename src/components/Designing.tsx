'use client'

import React from 'react';
import { PenTool, MonitorSmartphone, LayoutDashboard, Palette } from 'lucide-react';

const designServices = [
  {
    title: "UI/UX Design",
    description: "Intuitive and user-centered interfaces designed to delight users and improve usability across web and mobile apps.",
    icon: <MonitorSmartphone className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Graphic Design",
    description: "Visual storytelling through impactful graphics that reflect your brand identity across digital and print media.",
    icon: <PenTool className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Web & App Layouts",
    description: "Pixel-perfect layouts designed for performance, responsiveness, and aesthetic impact that drive engagement.",
    icon: <LayoutDashboard className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Brand Visuals & Color Systems",
    description: "Custom iconography, color palettes, and brand systems that keep your visual presence strong and consistent.",
    icon: <Palette className="w-8 h-8 text-[var(--color-accent)]" />,
  },
];

export default function DesigningHero() {
  return (
    <section className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)]">
          Design That Defines Experience
        </h1>
        <p className="text-lg text-[var(--color-text-subtle)] mb-12 max-w-3xl mx-auto leading-relaxed">
          At aXe Tech, we don’t just design for aesthetics — we craft experiences. From sleek user interfaces to impactful graphics, our designs tell your story clearly and creatively. Whether it’s UI/UX, web layouts, or visual identity, we make sure every pixel works in harmony to serve your users and elevate your brand.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {designServices.map(({ title, description, icon }) => (
            <article
              key={title}
              className="bg-[var(--color-bg-dark)] border border-[var(--color-primary)] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-start gap-4">
                {icon}
                <h3 className="text-2xl font-semibold text-[var(--color-primary)]">{title}</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <a
            href="#contact"
            className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-main)] font-medium py-3 px-8 rounded-full transition-colors duration-300"
          >
            Start Designing With Us
          </a>
        </div>
      </div>
    </section>
  );
}
