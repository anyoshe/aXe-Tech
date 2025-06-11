import { dbConnect } from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

type BlogPostType = {
  coverImage?: string;
  title: string;
  date: string | Date;
  content: string;
  description?: string;
  author?: string;
  slug: string;
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  await dbConnect();
  const post = await BlogPost.findOne({ slug: params.slug }).lean<BlogPostType>();
  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="rounded mb-6 w-full h-72 object-cover"
        />
      )}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString()}
        {post.author && <> &middot; By {post.author}</>}
      </p>
      <div className="prose prose-lg">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}