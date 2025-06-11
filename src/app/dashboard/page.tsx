'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  author?: string;
  date?: string;
};

type BlogForm = {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  author?: string;
};

export default function Dashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogForm>({
    title: '', slug: '', description: '', content: '', coverImage: '', author: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess(true);
      setForm({ title: '', slug: '', description: '', content: '', coverImage: '', author: '' });
      const postsRes = await fetch('/api/blog');
      setPosts(await postsRes.json());
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border" required />
        <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="w-full p-2 border" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border" required />
        <input name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="Cover Image URL" className="w-full p-2 border" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (Markdown supported)" className="w-full p-2 border" rows={6} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
        {success && <p className="text-green-600">Blog posted successfully!</p>}
      </form>
      <h2 className="text-xl font-semibold mb-4">All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id} className="mb-2">
            <strong>{post.title}</strong> — <a href={`/blog/${post.slug}`} className="text-blue-600 underline">View</a>
          </li>
        ))}
      </ul>
    </main>
  );
}