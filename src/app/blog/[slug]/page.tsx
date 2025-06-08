import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content', 'blog'));
  return files
    .filter((filename) => filename.endsWith('.mdx') || filename.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace(/\.mdx?$/, ''),
    }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePathMdx = path.join(process.cwd(), 'content', 'blog', `${params.slug}.mdx`);
  const filePathMd = path.join(process.cwd(), 'content', 'blog', `${params.slug}.md`);
  let rawContent = '';
  if (fs.existsSync(filePathMdx)) {
    rawContent = fs.readFileSync(filePathMdx, 'utf8');
  } else if (fs.existsSync(filePathMd)) {
    rawContent = fs.readFileSync(filePathMd, 'utf8');
  } else {
    return <div>Post not found</div>;
  }
  const { content, data } = matter(rawContent);
  const { content: compiled } = await compileMDX({ source: content });

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <img src={data.coverImage} alt={data.title} className="rounded mb-6 w-full h-72 object-cover" />
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-500 mb-4">{data.date}</p>
      <div className="prose prose-lg">{compiled}</div>
    </article>
  );
}