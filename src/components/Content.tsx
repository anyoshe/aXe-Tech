'use client'

import React from 'react';
import { Video, FileText, LayoutList, Edit3 } from 'lucide-react';

const contentTypes = [
  {
    title: "Video Content",
    description: "Engaging videos that capture attention quickly and deliver your message visually, perfect for storytelling and brand awareness.",
    icon: <Video className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Informative Articles & Blog Posts",
    description: "Long-form content that educates your audience, answers their questions, and builds authority on topics they care about.",
    icon: <FileText className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Step-by-Step How-Tos & DIY Guides",
    description: "Clear, actionable instructions that empower your customers, solving their pain points while establishing trust.",
    icon: <LayoutList className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: "Catchy Cards & Social Posts",
    description: "Quick-hit content designed to spark interest and shares, driving traffic and creating brand loyalty.",
    icon: <Edit3 className="w-8 h-8 text-[var(--color-accent)]" />,
  },
];

export default function ContentCreationHero() {
  return (
    <section className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)]">
          Content That Converts & Connects
        </h1>
        <p className="text-lg text-[var(--color-text-subtle)] mb-12 max-w-3xl mx-auto leading-relaxed">
          With good and intentional content tailored to the right audience—whether video, cards, or long posts explaining how-to or DIY—our content hits the mark. Catchy, interesting, and to the point, it addresses your customers’ pain points, creates stronger followings, more leads, and brand loyalty. At aXe Tech, we ensure you get exactly that, growing your business through powerful content.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {contentTypes.map(({ title, description, icon }) => (
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
            Elevate Your Content Today
          </a>
        </div>
      </div>
    </section>
  );
}
