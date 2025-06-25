import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { normalizeTag } from '@/utils/normalizeTag';

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  author?: string;
  date?: string;
  tags?: string[];
};

async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch posts');
  const allPosts: BlogPost[] = await res.json();

  const normalizedTag = normalizeTag(tag);

  return allPosts.filter(post => {
    const tagList = Array.isArray(post.tags)
      ? post.tags.flatMap(t =>
          t.split(',').map(tag => tag.replace(/["']/g, '').trim())
        )
      : [];

    return tagList.some(t => normalizeTag(t) === normalizedTag);
  });
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  if (!posts || posts.length === 0) return notFound();

  const formattedTag = tag.replace(/-/g, ' ');

  return (
    <main className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold text-lime-400 mb-6">
        Posts tagged #{formattedTag}
      </h1>

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
                />
              </div>
            )}
            <div className="p-4 flex flex-col justify-between grow">
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
              <p className="text-gray-300 text-sm line-clamp-3 mt-auto">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}