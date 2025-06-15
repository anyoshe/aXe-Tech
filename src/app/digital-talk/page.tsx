'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type BlogPost = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  author?: string;
  date?: string;
};

export default function DigitalTalkPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', service: '', details: '' });
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col lg:flex-row">
      {/* Scrollable Blog List */}
      <section className="flex-1 overflow-y-auto p-6 max-h-screen">
        <h1 className="text-4xl font-bold text-indigo-400 mb-6 text-center">Digital Talk</h1>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-2xl transition flex flex-col"
              style={{ height: '300px' }} // Fixed card height
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-4 flex flex-col justify-between grow">
                <div>
                  <h2 className="text-lg font-bold group-hover:text-indigo-400 mb-1">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-400 mb-2">
                    {post.date &&
                      new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                  </p>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3 mt-auto">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Fixed Contact + Ad */}
      <aside className="w-full lg:w-[400px] bg-gray-800 p-6 flex flex-col justify-between sticky top-0 max-h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-lime-400 text-center">Request a Service</h2>
          {submitted ? (
            <div className="text-center text-lime-400 font-semibold text-lg">
              Thank you! We’ll get in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
                required
              />
              <input
                type="text"
                name="service"
                value={form.service}
                onChange={handleChange}
                placeholder="Service Needed (e.g. Branding, Web Dev)"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
                required
              />
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Tell us more about your needs..."
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full bg-lime-400 text-gray-900 font-semibold py-2 rounded hover:bg-lime-300 transition"
              >
                Send Request
              </button>
            </form>
          )}
        </div>

        {/* Ad Section */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-center text-sm text-gray-400">
          <p className="mb-2">📢 <strong>Special Offer</strong></p>
          <p>Get 15% off on your first web project! Use code: <code>DIGITAL15</code></p>
        </div>
      </aside>
    </main>
  );
}
