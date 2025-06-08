'use client'

import React from 'react'
import {
  Globe,
  Smartphone,
  ShoppingCart,
  LayoutTemplate,
  Wrench,
  TrendingUp,
  TerminalSquare,
  Server,
} from 'lucide-react'

const developmentServices = [
  {
    title: 'Websites & Web Apps',
    description: 'From simple company websites to dynamic and interactive web applications, we build scalable solutions that perform.',
    icon: <Globe className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps built for performance, responsiveness, and a smooth user experience.',
    icon: <Smartphone className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Ecommerce Platforms',
    description: 'Fully integrated online stores with seamless user experiences, secure payments, and conversion-focused design.',
    icon: <ShoppingCart className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Landing Pages',
    description: 'High-converting, fast-loading landing pages designed for campaigns, product launches, or lead generation.',
    icon: <LayoutTemplate className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Web Maintenance',
    description: 'Ongoing updates, fixes, backups, and support to keep your website secure, fast, and running smoothly.',
    icon: <Wrench className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'SEO Optimization',
    description: 'Optimized code, metadata, and structure that help your website rank higher and perform better on search engines.',
    icon: <TrendingUp className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'POS Integration',
    description: 'Custom Point-of-Sale system development and integrations that power retail, inventory, and analytics.',
    icon: <TerminalSquare className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Backend/API Development',
    description: 'Robust backend architecture, RESTful APIs, and database systems tailored to your unique business logic.',
    icon: <Server className="w-8 h-8 text-[var(--color-accent)]" />,
  },
]

export default function DevelopmentHero() {
  return (
    <section className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)]">
          Powerful Development That Delivers
        </h1>
        <p className="text-lg text-[var(--color-text-subtle)] mb-12 max-w-3xl mx-auto leading-relaxed">
          At aXe Tech, we don’t just code — we build digital engines that drive results. Whether it’s a stunning website, a robust ecommerce platform, or a fast mobile app, our development team ensures your solution is fast, scalable, secure, and tailored to your goals.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {developmentServices.map(({ title, description, icon }) => (
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
            Let’s Build Something Powerful
          </a>
        </div>
      </div>
    </section>
  )
}
