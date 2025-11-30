// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// type BlogPost = {
//   _id: string;
//   title: string;
//   subtitle?: string;
//   slug: string;
//   description: string;
//   content: string;
//   coverImage?: string;
//   author?: string;
//   date?: string;
// };

// export default function DigitalTalkPage() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     service: '',
//     details: '',
//   });
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     fetch('/api/blog')
//       .then(res => res.json())
//       .then(data => setPosts(data));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("https://formspree.io/f/xwpbbavl", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(form), // your state: { name, email, service, details }
//     });

//     if (response.ok) {
//       setSubmitted(true);
//       setForm({ name: "", email: "", service: "", details: "" }); // reset form
//     } else {
//       const data = await response.json();
//       console.error("Formspree error:", data);
//       alert("❌ Something went wrong. Please try again.");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("⚠️ Error submitting form.");
//   }
// };

//   return (
//     <main className="bg-gray-900 text-white min-h-screen flex flex-col lg:flex-row">
//       {/* Scrollable Blog List */}
//       <section className="flex-1 overflow-y-auto p-6 max-h-screen">
//         <h1 className="text-4xl font-bold text-indigo-400 mb-6 text-center">Digital Talk</h1>
//         <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//           {posts.map(post => (
//             <Link
//               key={post.slug}
//               href={`/blog/${post.slug}`}
//               className="group bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-2xl transition flex flex-col"
//               style={{ height: '300px' }} // Fixed card height
//             >
//               {post.coverImage && (

//                 <div className="relative w-full h-32">
//                   <Image
//                     src={post.coverImage}
//                     alt={post.title}
//                     fill
//                     sizes="(max-width: 640px) 100vw, 33vw"
//                     className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
//                     priority={false}
//                   />
//                 </div>
//               )}
//               <div className="p-4 flex flex-col justify-between grow">
//                 <div>
//                   <h2 className="text-lg font-bold group-hover:text-indigo-400 mb-1">
//                     {post.title}
//                   </h2>
//                   <p className="text-xs text-gray-400 mb-2">
//                     {post.date &&
//                       new Date(post.date).toLocaleDateString(undefined, {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                       })}
//                   </p>
//                 </div>
//                 <p className="text-gray-300 text-sm line-clamp-3 mt-auto">{post.description}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Fixed Contact + Ad */}
      
//       <aside className="w-full lg:w-[400px] bg-gray-800 p-6 flex flex-col justify-between 
//   lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">

//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4 text-lime-400 text-center">Request a Service</h2>
//           {submitted ? (
//             <div className="text-center text-lime-400 font-semibold text-lg">
//               Thank you! We’ll get in touch soon.
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Your Name"
//                 className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Your Email"
//                 className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
//                 required
//               />
//               <input
//                 type="text"
//                 name="service"
//                 value={form.service}
//                 onChange={handleChange}
//                 placeholder="Service Needed (e.g. Branding, Web Dev)"
//                 className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
//                 required
//               />
//               <textarea
//                 name="details"
//                 value={form.details}
//                 onChange={handleChange}
//                 placeholder="Tell us more about your needs..."
//                 className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
//                 rows={4}
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-lime-400 text-gray-900 font-semibold py-2 rounded hover:bg-lime-300 transition"
//               >
//                 Send Request
//               </button>
//             </form>
//           )}
//         </div>

//         {/* Ad Section */}
//         <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-center text-sm text-gray-400">
//           <p className="mb-2">📢 <strong>Special Offer</strong></p>
//           <p>Get 15% off on your first web project! Use code: <code>DIGITAL15</code></p>
//         </div>
//         {/* Academy Invite Section */}
//         <div className="mt-6 mb-6 lg:mb-0 bg-indigo-600 text-white p-4 rounded-xl text-center shadow-lg">
//           <h3 className="text-xl font-bold mb-2">🚀 Join Our Tech Talent Academy</h3>
//           <p className="text-sm text-indigo-100 mb-3">
//             Build coding, design & digital skills this holiday. Limited slots!
//           </p>
//           <Link
//             href="/registration"
//             className="inline-block bg-lime-400 text-gray-900 font-semibold px-4 py-2 rounded hover:bg-lime-300 transition"
//           >
//             Join Now
//           </Link>
//         </div>

//       </aside>
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

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

// Fallback posts for the main blog page
const fallbackPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Getting Started with ICT in Schools",
    slug: "getting-started-with-ict-in-schools",
    description: "Learn how to effectively implement ICT solutions in educational institutions and maximize your technology investment.",
    content: "Full content here...",
    coverImage: "/samples/laptop1.jpg",
    author: "GetAxe.Tech Team",
    date: new Date().toISOString()
  },
  {
    _id: "2", 
    title: "Choosing the Right ERP System",
    slug: "choosing-the-right-erp-system",
    description: "A comprehensive guide to selecting the perfect ERP solution for your school or business needs and budget.",
    content: "Full content here...",
    coverImage: "/samples/ERp.jpg",
    author: "GetAxe.Tech Team",
    date: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Mobile Computer Labs: Cost-Effective ICT",
    slug: "mobile-computer-labs-cost-effective-ict",
    description: "Discover how mobile computer labs can provide flexible, affordable ICT access for institutions of all sizes.",
    content: "Full content here...",
    coverImage: "/samples/mobilecomputerlab.jpg",
    author: "GetAxe.Tech Team",
    date: new Date().toISOString()
  },
  {
    _id: "4",
    title: "Digital Transformation for SMEs",
    slug: "digital-transformation-for-smes",
    description: "How small and medium enterprises can leverage technology to compete with larger corporations.",
    content: "Full content here...",
    coverImage: "/samples/webdevelopment.jpg",
    author: "GetAxe.Tech Team",
    date: new Date().toISOString()
  },
  {
    _id: "5",
    title: "Cybersecurity Basics for Organizations",
    slug: "cybersecurity-basics-for-organizations",
    description: "Essential cybersecurity practices every organization should implement to protect their data.",
    content: "Full content here...",
    coverImage: "/samples/network.jpg",
    author: "GetAxe.Tech Team",
    date: new Date().toISOString()
  },
  {
    _id: "6",
    title: "The Future of Education Technology",
    slug: "future-of-education-technology",
    description: "Exploring emerging technologies that are shaping the future of learning and teaching.",
    content: "Full content here...",
    coverImage: "/samples/branding.jpg",
    author: "GetAxe.Tech Team",
    date: new Date().toISOString()
  }
];

export default function DigitalTalkPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
          setPosts(data);
        } else {
          // Use fallback posts if API returns empty array
          setPosts(fallbackPosts);
          setError('No blog posts found. Showing sample content.');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Showing sample content.');
        // Use fallback posts on error
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xwpbbavl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", service: "", details: "" });
      } else {
        const data = await response.json();
        console.error("Formspree error:", data);
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error submitting form.");
    }
  };

  return (
    <>
    <Navbar/>
    <main className="bg-gray-900 text-white min-h-screen flex flex-col lg:flex-row">
      {/* Scrollable Blog List */}
      <section className="flex-1 overflow-y-auto p-6 max-h-screen">
        <h1 className="text-4xl font-bold text-indigo-400 mb-6 text-center">Digital Talk</h1>
        
        {error && (
          <div className="text-center mb-6 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg max-w-2xl mx-auto">
            <p className="text-yellow-400 text-sm">{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl overflow-hidden shadow animate-pulse"
                style={{ height: '300px' }}
              >
                <div className="w-full h-32 bg-gray-600 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-600 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-2xl transition flex flex-col"
                style={{ height: '300px' }}
              >
                {post.coverImage && (
                  <div className="relative w-full h-32">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                      priority={false}
                    />
                  </div>
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
        )}
      </section>

      {/* Fixed Contact + Ad */}
      <aside className="w-full lg:w-[400px] bg-gray-800 p-6 flex flex-col justify-between 
        lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-lime-400 text-center">Request a Service</h2>
          {submitted ? (
            <div className="text-center text-lime-400 font-semibold text-lg">
              Thank you! We'll get in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-lime-400 focus:outline-none transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-lime-400 focus:outline-none transition-colors"
                required
              />
              <input
                type="text"
                name="service"
                value={form.service}
                onChange={handleChange}
                placeholder="Service Needed (e.g. Branding, Web Dev)"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-lime-400 focus:outline-none transition-colors"
                required
              />
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Tell us more about your needs..."
                className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-lime-400 focus:outline-none transition-colors"
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full bg-lime-400 text-gray-900 font-semibold py-2 rounded hover:bg-lime-300 transition-colors"
              >
                Send Request
              </button>
            </form>
          )}
        </div>

        {/* Ad Section */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-center text-sm text-gray-400 mb-6">
          <p className="mb-2">📢 <strong>Special Offer</strong></p>
          <p>Get 15% off on your first web project! Use code: <code className="bg-gray-800 px-2 py-1 rounded">DIGITAL15</code></p>
        </div>
        
        {/* Academy Invite Section */}
        <div className="bg-indigo-600 text-white p-4 rounded-xl text-center shadow-lg">
          <h3 className="text-xl font-bold mb-2">🚀 Join Our Tech Talent Academy</h3>
          <p className="text-sm text-indigo-100 mb-3">
            Build coding, design & digital skills this holiday. Limited slots!
          </p>
          <Link
            href="/registration"
            className="inline-block bg-lime-400 text-gray-900 font-semibold px-4 py-2 rounded hover:bg-lime-300 transition-colors"
          >
            Join Now
          </Link>
        </div>
      </aside>
    </main>
    </>
  );
}