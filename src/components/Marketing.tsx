'use client'

import React from 'react'
import {
  Megaphone,
  BarChart3,
  Users,
  ThumbsUp,
  Globe,
  Lightbulb,
  MessageSquare,
  Target,
} from 'lucide-react'

const marketingServices = [
  {
    title: 'Digital Marketing Strategy',
    description:
      'We craft data-driven marketing strategies to meet your business goals—targeting the right audience with the right message.',
    icon: <Target className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Social Media Management',
    description:
      'We create, schedule, and manage content across platforms to keep your audience engaged and your brand consistent.',
    icon: <MessageSquare className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Online Advertising',
    description:
      'Maximize ROI with high-converting ads on platforms like Google, Facebook, Instagram, and LinkedIn.',
    icon: <Megaphone className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'SEO & SEM',
    description:
      'From organic search optimization to paid search campaigns, we help you dominate search engine rankings.',
    icon: <BarChart3 className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Email Marketing',
    description:
      'Build deeper relationships with customers through personalized, automated email campaigns that drive action.',
    icon: <Users className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Content Marketing',
    description:
      'We plan and create content that educates, entertains, and converts—blogs, videos, guides, and more.',
    icon: <Lightbulb className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Influencer Collaboration',
    description:
      'Tap into powerful niche communities by leveraging influencers that match your brand and audience.',
    icon: <ThumbsUp className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    title: 'Global Brand Reach',
    description:
      'Expand your presence and brand recognition through tailored strategies that work across markets and borders.',
    icon: <Globe className="w-8 h-8 text-[var(--color-accent)]" />,
  },
]

export default function MarketingHero() {
  return (
    <section className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--color-primary)]">
          Marketing That Moves the Needle
        </h1>
        <p className="text-lg text-[var(--color-text-subtle)] mb-12 max-w-3xl mx-auto leading-relaxed">
          At aXe Tech, we don’t just run campaigns—we drive business growth. With over 10 years of experience in sales and marketing, both online and offline, our expert team helps you find the right voice, the right channel, and the right momentum to win your market.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {marketingServices.map(({ title, description, icon }) => (
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
            Talk to Our Marketing Experts
          </a>
        </div>
      </div>
    </section>
  )
}
