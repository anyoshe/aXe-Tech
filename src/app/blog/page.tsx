
import { getAllPosts } from '@/lib/getAllPosts';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)] py-20 px-4">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-[var(--color-primary)]">
          Digital Talk
        </h1>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-[var(--color-bg-dark)]"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-2 uppercase">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-[var(--color-text-subtle)] text-base leading-relaxed">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
