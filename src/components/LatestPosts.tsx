'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  date?: string;
};

export default function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3)));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="bg-[var(--color-bg-dark)] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-[var(--color-primary)] mb-16 text-center">
          Decode the Digital — One Insight at a Time.
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-[#1f2937] border border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-wide">
                  {post.date && new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-[var(--color-text-subtle)] mb-6 flex-grow leading-relaxed">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-full transition-all duration-300"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}