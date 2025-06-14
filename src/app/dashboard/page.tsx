'use client';

import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

type BlogPost = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  secondaryImage?: string;
  author?: string;
  date?: string;
};

type BlogForm = {
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  secondaryImage?: string;
  author?: string;
};

type ImageBlock = {
  url: string;
  caption?: string;
};

export default function Dashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogForm>({
    title: '', slug: '', description: '', content: '', coverImage: '', secondaryImage: '', author: '', subtitle: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editingPostSlug, setEditingPostSlug] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [imageBlocks, setImageBlocks] = useState<ImageBlock[]>([]);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: prev.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]+/g, '')
    }));
  }, [form.title]);

  const fetchPosts = async () => {
    const res = await fetch('/api/blog');
    setPosts(await res.json());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addImageBlock = () => {
    const url = prompt('Enter image URL:');
    const caption = prompt('Enter image caption (optional):');
    if (url) {
      setImageBlocks([...imageBlocks, { url, caption: caption || '' }]);
      const markdownImage = `![${caption || 'Image'}](${url}${caption ? ' "' + caption + '"' : ''})\n`;
      setForm((prev) => ({
        ...prev,
        content: prev.content + markdownImage
      }));
      contentRef.current?.focus();
    }
  };

  const addSubtitle = () => {
    const subtitle = prompt('Enter subtitle text:');
    if (subtitle) {
      const markdownSubtitle = `## ${subtitle}\n`;
      setForm((prev) => ({
        ...prev,
        content: prev.content + markdownSubtitle
      }));
      contentRef.current?.focus();
    }
  };

  const addList = () => {
    const items = prompt('Enter list items (one per line):')?.split('\n').filter(Boolean);
    if (items?.length) {
      const markdownList = items.map(item => `- ${item}`).join('\n') + '\n';
      setForm((prev) => ({
        ...prev,
        content: prev.content + markdownList
      }));
      contentRef.current?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const method = editingPostSlug ? 'PUT' : 'POST';
    const url = editingPostSlug ? `/api/blog/${editingPostSlug}` : '/api/blog';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess(true);
      resetForm();
      await fetchPosts();
    }
    setLoading(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPostSlug(post.slug);
    setForm({
      title: post.title,
      subtitle: post.subtitle || '',
      slug: post.slug,
      description: post.description,
      content: post.content,
      coverImage: post.coverImage || '',
      secondaryImage: post.secondaryImage || '',
      author: post.author || ''
    });
    setImageBlocks([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (slug: string) => {
    setLoading(true);
    const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      await fetchPosts();
      setShowDeleteModal(null);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ title: '', subtitle: '', slug: '', description: '', content: '', coverImage: '', secondaryImage: '', author: '' });
    setEditingPostSlug(null);
    setImageBlocks([]);
  };

  return (
    <main className="max-w-4xl mx-auto py-12 px-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">Blog Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-12 space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div>
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-gray-400 rounded"
            required
            readOnly
          />
        </div>
        <div>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (max 140 chars)"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            maxLength={140}
            required
          />
          <p className="text-sm text-gray-300 mt-1">{form.description.length}/140 characters</p>
        </div>
        <div>
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div>
          <input
            name="secondaryImage"
            value={form.secondaryImage}
            onChange={handleChange}
            placeholder="Secondary Image URL"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="relative">
          <textarea
            ref={contentRef}
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content (Markdown supported)"
            className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows={10}
            required
          />
          <div className="flex space-x-2 mt-2">
            <button
              type="button"
              onClick={addImageBlock}
              className="px-3 py-1 bg-lime-400 text-gray-900 rounded hover:bg-lime-500 text-sm"
            >
              Add Image
            </button>
            <button
              type="button"
              onClick={addSubtitle}
              className="px-3 py-1 bg-lime-400 text-gray-900 rounded hover:bg-lime-500 text-sm"
            >
              Add Subtitle
            </button>
            <button
              type="button"
              onClick={addList}
              className="px-3 py-1 bg-lime-400 text-gray-900 rounded hover:bg-lime-500 text-sm"
            >
              Add List
            </button>
          </div>
        </div>
        <div className="border border-gray-700 p-6 bg-gray-800 rounded">
          <h3 className="font-semibold text-lg mb-2 text-indigo-600">Live Preview</h3>
          <div className="prose prose-invert">
            <ReactMarkdown>{form.content}</ReactMarkdown>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
            disabled={loading}
          >
            {loading ? 'Processing...' : editingPostSlug? 'Update Post' : 'Create Post'}
          </button>
          {editingPostSlug && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
            >
              Cancel Edit
            </button>
          )}
        </div>
        {success && <p className="text-lime-400 mt-2">Blog {editingPostSlug ? 'updated' : 'posted'} successfully!</p>}
      </form>
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">All Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="flex justify-between items-center bg-gray-800 p-4 rounded shadow">
            <div>
              <strong className="text-white">{post.title}</strong>
              <a href={`/blog/${post.slug}`} className="text-indigo-600 underline ml-2">View</a>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="px-3 py-1 bg-lime-400 text-gray-900 rounded hover:bg-lime-500"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(post.slug)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-white">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}