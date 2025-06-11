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

// Define props type with params as a Promise
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  await dbConnect();
  
  // Await params to resolve the Promise
  const { slug } = await params;
  
  // Fetch the blog post using the resolved slug
  const post = await BlogPost.findOne({ slug }).lean<BlogPostType>();
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
        {post.author && <> · By {post.author}</>}
      </p>
      <div className="prose prose-lg">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}