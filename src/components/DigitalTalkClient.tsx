

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// // import { BlogPost } from '@/lib/getAllPosts';

// export default function DigitalTalkClient({ posts }: { posts: BlogPost[] }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ name, email, message });
//     setSubmitted(true);
//   };

//   return (
//     <section id="digital-talk" className="py-24 bg-[var(--color-bg-dark)] text-[var(--color-text-main)]">
//       {/* Intro */}
//       <div className="max-w-4xl mx-auto px-4 mb-20 text-center">
//         <h2 className="text-5xl font-extrabold mb-6 text-[var(--color-primary)]">Digital Talk</h2>
//         <p className="text-lg text-[var(--color-text-subtle)] leading-relaxed">
//           In today’s digital landscape, branding, content, design, development, and marketing
//           are not silos—they’re a unified ecosystem that drives growth and impact.
//         </p>
//         <ul className="mt-6 text-left list-disc list-inside space-y-2 text-[var(--color-text-muted)] text-base">
//           <li><strong className="text-[var(--color-accent)]">Branding</strong>: Craft a memorable identity.</li>
//           <li><strong className="text-[var(--color-accent)]">Content</strong>: Tell your story with clarity.</li>
//           <li><strong className="text-[var(--color-accent)]">Design</strong>: Build intuitive, beautiful interfaces.</li>
//           <li><strong className="text-[var(--color-accent)]">Development</strong>: Deliver fast, secure, scalable solutions.</li>
//           <li><strong className="text-[var(--color-accent)]">Marketing</strong>: Reach, engage, and convert your audience.</li>
//         </ul>
//       </div>

//       {/* Blog Cards */}
//       <div className="max-w-7xl mx-auto px-4 mb-24">
//         <h3 className="text-4xl font-semibold text-center mb-12 text-[var(--color-accent)]">Latest Insights</h3>
//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <article
//               key={post.slug}
//               className="bg-[#1f2937] border border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col"
//             >
//               {post.coverImage && (
//                 <img
//                   src={post.coverImage}
//                   alt={post.title}
//                   className="w-full h-44 object-cover rounded-lg mb-4"
//                 />
//               )}
//               <h4 className="text-xl font-bold text-white mb-2">{post.title}</h4>
//               <p className="text-[var(--color-text-muted)] text-sm mb-4 flex-grow leading-relaxed">
//                 {post.description}
//               </p>
//               <Link
//                 href={`/blog/${post.slug}`}
//                 className="mt-auto inline-block text-center px-5 py-2 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-hover)] transition"
//               >
//                 Read more →
//               </Link>
//             </article>
//           ))}
//         </div>
//       </div>

//       {/* Inquiry Form */}
//       <div className="max-w-3xl mx-auto px-4">
//         <h3 className="text-4xl font-semibold text-center mb-10 text-[var(--color-accent)]">Get in Touch</h3>

//         {submitted ? (
//           <p className="text-center text-[var(--color-accent)] font-medium text-lg">
//             Thank you for your message! We’ll be in touch shortly.
//           </p>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6 bg-[#1f2937] p-8 rounded-2xl shadow-xl">
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 bg-[#111827] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 bg-[#111827] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Message</label>
//               <textarea
//                 required
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 rows={5}
//                 className="w-full px-4 py-3 bg-[#111827] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-hover)] transition"
//             >
//               Submit Inquiry
//             </button>
//           </form>
//         )}
//       </div>
//     </section>
//   );
// }
