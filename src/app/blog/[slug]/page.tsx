'use client';

import React, { use, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import CTA from '@/components/CTA';

// Types
interface CommentType {
  name: string;
  text: string;
  date: string;
  likes?: number;
  replies?: CommentType[];
}

interface BlogPostType {
  coverImage?: string;
  title: string;
  subtitle?: string;
  date: string | Date;
  content: string;
  description?: string;
  author?: string;
  slug: string;
  tags?: string[];
  likes?: number;
  comments?: CommentType[];
}

interface RecursiveCommentProps {
  comment: CommentType;
  path: number[];
  onAction: (action: string, path: number[], replyObj?: { name: string; text: string }) => void;
}

const RecursiveComment: React.FC<RecursiveCommentProps> = ({ comment, path, onAction }) => {
  const [replying, setReplying] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');

  return (
    <li className="p-4 rounded-lg bg-gray-800 text-gray-200">
      <p className="text-sm">
        <span className="font-semibold text-white">{comment.name}</span>: {comment.text}
      </p>
      <div className="flex gap-4 mt-2 text-xs text-indigo-400">
        <button onClick={() => onAction('like-comment', path)}>👍 {comment.likes || 0}</button>
        <button onClick={() => setReplying(!replying)}>Reply</button>
      </div>
      {replying && (
        <form
          onSubmit={e => {
            e.preventDefault();
            onAction('reply-comment', path, { name: replyName, text: replyText });
            setReplyName('');
            setReplyText('');
            setReplying(false);
          }}
          className="mt-3 space-y-2"
        >
          <input
            value={replyName}
            onChange={e => setReplyName(e.target.value)}
            placeholder="Your name"
            className="w-full border rounded px-2 py-1 bg-gray-700 text-white"
            required
          />
          <input
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Your reply"
            className="w-full border rounded px-2 py-1 bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
          >
            Reply
          </button>
        </form>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="ml-4 mt-0 space-y-0 border-l border-gray-700 pl-3">
          {comment.replies.map((reply, idx) => (
            <RecursiveComment key={idx} comment={reply} path={[...path, idx]} onAction={onAction} />
          ))}
        </ul>
      )}
    </li>
  );
};


export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    fetch(`/api/blog?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        const found = Array.isArray(data) ? data.find((p: BlogPostType) => p.slug === slug) : data;
        setPost(found);
        setLikes(found?.likes || 0);
        setComments(found?.comments || []);
      });
  }, [slug]);

  const handleAction = async (
    action: string,
    path: number[] = [],
    replyObj?: { name: string; text: string }
  ) => {
    const res = await fetch(`/api/blog/${slug}/actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        action === 'comment'
          ? { action, name, text: comment }
          : action === 'like-comment'
            ? { action, path }
            : action === 'reply-comment'
              ? { action, path, reply: replyObj }
              : { action }
      ),
    });
    const updated = await res.json();
    setLikes(updated.likes);
    setComments(updated.comments);
    if (action === 'comment') setComment('');
  };

  const handleShare = () => {
    if (!post) return;
    const shareData = {
      title: post.title,
      text: post.description,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  if (!post) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="bg-gray-900 text-white grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 px-6 py-10 min-h-screen">
      <motion.article
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="rounded mb-6 w-full h-96 object-cover object-center"
          />
        )}
        <h1 className="text-4xl font-bold mb-2 text-white">{post.title}</h1>
        {post.subtitle && <h2 className="text-2xl text-indigo-300 font-medium mb-4 italic">{post.subtitle}</h2>}
        <p className="text-gray-400 mb-4">
          {new Date(post.date).toLocaleDateString()} {post.author && <>· By {post.author}</>}
        </p>
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, i) => (
              <span key={i} className="bg-indigo-700 px-2 py-1 rounded text-sm text-white">#{tag}</span>
            ))}
          </div>
        )}
        <div className="prose prose-invert prose-lg mb-6
                  first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-400
                  [&_ul]:list-disc [&_ul]:pl-5 
                  [&_ol]:list-decimal [&_ol]:pl-5 
                  [&_h2]:text-2xl [&_h2]:text-indigo-300 [&_h2]:mt-6 [&_h2]:mb-2 
                  [&_h3]:text-xl [&_h3]:text-indigo-400 [&_h3]:mt-4 [&_h3]:mb-1
                  [&_img]:rounded-xl [&_img]:my-6 [&_img]:mx-auto [&_img]:shadow-lg
                  [&_img]:w-full [&_img]:max-w-[600px] [&_img]:h-[380px] [&_img]:object-cover
                  [&_figure]:text-center [&_figcaption]:text-sm [&_figcaption]:text-gray-400"
        >


          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <div className="flex flex-wrap gap-4 my-6">
          <button onClick={() => handleAction('like')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            👍 {likes}
          </button>
          <button onClick={handleShare} className="bg-lime-400 text-black px-4 py-2 rounded hover:brightness-90">
            Share
          </button>
          <button onClick={() => setShowCommentBox(prev => !prev)} className="border border-indigo-600 text-indigo-300 px-4 py-2 rounded">
            {showCommentBox ? 'Hide Comment Box' : 'Comment'}
          </button>
        </div>

        {showCommentBox && (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAction('comment');
            }}
            className="mb-6 space-y-3"
          >
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white"
              required
            />
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add a comment"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white"
              rows={3}
              required
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
              Post Comment
            </button>
          </form>
        )}

        <div className="my-6">
          <h3 className="text-2xl font-bold mb-4">Comments</h3>
          <ul className="space-y-2">
            {comments.map((c, i) => (
              <RecursiveComment key={i} comment={c} path={[i]} onAction={handleAction} />
            ))}
          </ul>
        </div>
      </motion.article>
      {/* CTA for Mobile */}
<div className="block lg:hidden mt-10 bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-xl p-6 text-center shadow-lg border border-indigo-500">
  <CTA />
</div>


      <aside className="w-full lg:w-96 px-4 py-6 bg-gray-800 rounded-xl sticky top-6 self-start space-y-8">
  {/* Ad Section */}
  <div>
    <h3 className="text-lime-400 font-bold text-xl mb-4">Sponsored</h3>
    <img
      src="/samples/social-media.jpg"
      alt="Advertisement"
      className="rounded-lg mb-4 w-full object-cover h-60"
    />
    <p className="text-sm text-gray-300">
      Looking to grow your audience?{' '}
      <a href="/your-service-link" className="text-lime-400 underline hover:text-lime-300">
        Try our service now
      </a>.
    </p>
  </div>

  {/* CTA for Desktop */}
  <div className="hidden lg:block bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-xl p-2 text-center shadow-lg border border-indigo-500">
    <CTA />
  </div>
</aside>


    </div>
   
  );
};
