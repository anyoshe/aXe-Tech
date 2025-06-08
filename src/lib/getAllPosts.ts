// src/lib/getAllPosts.ts
'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogPost = {
  title: string;
  date: string;
  description: string;
  slug: string;
  coverImage: string;
};

export async function getAllPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const files = fs.readdirSync(postsDirectory);

  // console.log('Files found in blog directory:', files);

  const posts = files
    .filter((filename) => {
      const fullPath = path.join(postsDirectory, filename);
      return (
        fs.statSync(fullPath).isFile() &&
        (filename.endsWith('.mdx') || filename.endsWith('.md'))
      );
    })
    .map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(postsDirectory, filename),
        'utf-8'
      );
      const { data } = matter(fileContent);

      return {
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        slug: filename.replace(/\.mdx?$/, ''),
        coverImage: data.coverImage as string,
      };
    })
    .filter(
      (post) =>
        post.title &&
        post.date &&
        post.description &&
        post.coverImage
    );

  // console.log('Posts after filtering:', posts);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}