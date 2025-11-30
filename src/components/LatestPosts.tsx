// 'use client';

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from 'next/image';

// type BlogPost = {
//   _id: string;
//   title: string;
//   slug: string;
//   description: string;
//   coverImage?: string;
//   date?: string;
// };

// export default function LatestPosts() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);

//   useEffect(() => {
//     fetch('/api/blog')
//       .then(res => res.json())
//       .then(data => setPosts(data.slice(0, 3)));
//   }, []);

//   if (posts.length === 0) return null;

//   return (
//     <section className="bg-[var(--color-bg-dark)] py-24 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-5xl font-extrabold text-[var(--color-primary)] mb-16 text-center">
//           Decode the Digital — One Insight at a Time.
//         </h2>
//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <article
//               key={post.slug}
//               className="group bg-[#1f2937] border border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
//             >
//               {post.coverImage && (

//                 <div className="relative w-full h-52">
//                   <Image
//                     src={post.coverImage}
//                     alt={post.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
//                     sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
//                   />
//                 </div>
//               )}
//               <div className="p-6 flex flex-col flex-grow">
//                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
//                   {post.title}
//                 </h3>
//                 <p className="text-xs text-[var(--color-text-muted)] mb-4 uppercase tracking-wide">
//                   {post.date && new Date(post.date).toLocaleDateString(undefined, {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </p>
//                 <p className="text-[var(--color-text-subtle)] mb-6 flex-grow leading-relaxed">
//                   {post.description}
//                 </p>
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   className="mt-auto inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium rounded-full transition-all duration-300"
//                 >
//                   Read more →
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  date?: string;
};

// Fallback posts in case the API fails or returns no data
const fallbackPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Getting Started with ICT in Schools",
    slug: "getting-started-with-ict-in-schools",
    description: "Learn how to effectively implement ICT solutions in educational institutions and maximize your technology investment.",
    coverImage: "/samples/laptop1.jpg",
    date: new Date().toISOString()
  },
  {
    _id: "2", 
    title: "Choosing the Right ERP System",
    slug: "choosing-the-right-erp-system",
    description: "A comprehensive guide to selecting the perfect ERP solution for your school or business needs and budget.",
    coverImage: "/samples/ERp.jpg",
    date: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Mobile Computer Labs: Cost-Effective ICT",
    slug: "mobile-computer-labs-cost-effective-ict",
    description: "Discover how mobile computer labs can provide flexible, affordable ICT access for institutions of all sizes.",
    coverImage: "/samples/mobilecomputerlab.jpg",
    date: new Date().toISOString()
  }
];

export default function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
          throw new Error(`Failed to load posts: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if data is valid and has posts
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data.slice(0, 3));
        } else {
          // Use fallback posts if API returns empty array
          setPosts(fallbackPosts);
          setError('No blog posts found. Showing sample content.');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load latest posts. Showing sample content.');
        // Use fallback posts on error
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="bg-[var(--color-bg-dark)] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-[var(--color-primary)] mb-16 text-center">
            Decode the Digital — One Insight at a Time.
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#1f2937] border border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-xl animate-pulse"
              >
                <div className="w-full h-52 bg-gray-600 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                  </div>
                  <div className="h-10 bg-gray-600 rounded-full w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no posts (though fallback should prevent this)
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--color-bg-dark)] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-[var(--color-primary)] mb-16 text-center">
          Decode the Digital — One Insight at a Time.
        </h2>
        
        {error && (
          <div className="text-center mb-8 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg max-w-md mx-auto">
            <p className="text-yellow-400 text-sm">{error}</p>
          </div>
        )}
        
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-[#1f2937] border border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {post.coverImage && (
                <div className="relative w-full h-52">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
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
        
        {/* View All Posts Link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}