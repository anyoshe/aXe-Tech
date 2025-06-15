'use client';

import React, { use, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type CommentType = {
  name: string;
  text: string;
  date: string;
  likes?: number;
  replies?: CommentType[];
};

type BlogPostType = {
  coverImage?: string;
  title: string;
  subtitle?: string;
  date: string | Date;
  content: string;
  description?: string;
  author?: string;
  slug: string;
  likes?: number;
  comments?: CommentType[];
};

function RecursiveComment({
  comment,
  path,
  onAction,
}: {
  comment: CommentType;
  path: number[];
  onAction: (action: string, path: number[], replyObj?: { name: string; text: string }) => void;
}) {
  const [replying, setReplying] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');

  return (
    <li className="mb-2 text-sm text-gray-300">
      <strong className="text-white">{comment.name}</strong>: {comment.text}
      <div className="flex gap-3 mt-1 text-sm text-indigo-400">
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
          className="mt-2"
        >
          <input
            value={replyName}
            onChange={e => setReplyName(e.target.value)}
            placeholder="Your name"
            className="border rounded px-2 py-1 mr-2 bg-gray-800 text-white"
            required
          />
          <input
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Your reply"
            className="border rounded px-2 py-1 mr-2 bg-gray-800 text-white"
            required
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded">
            Reply
          </button>
        </form>
      )}
      {(comment.replies?.length ?? 0) > 0 && (
        <ul className="ml-6 mt-2">
          {(comment.replies ?? []).map((r, i) => (
            <RecursiveComment key={i} comment={r} path={[...path, i]} onAction={onAction} />
          ))}
        </ul>
      )}

    </li>
  );
}

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
    const shareData = {
      title: post?.title,
      text: post?.description,
      url: typeof window !== 'undefined' ? window.location.href : '',
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white">
      {/* Main content */}
      <article className="flex-1 px-6 py-10 max-w-3xl mx-auto">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="rounded mb-6 w-full h-96 object-cover"
          />

        )}
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        {post.subtitle && (
          <h2 className="text-xl text-lime-400 font-semibold mb-4">{post.subtitle}</h2>
        )}
        <p className="text-gray-400 mb-4">
          {new Date(post.date).toLocaleDateString()}
          {post.author && <> · By {post.author}</>}
        </p>

        <div className="prose prose-invert prose-lg mb-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: (props) => <h2 className="text-lime-400 font-bold mt-6 mb-2" {...props} />,
              ul: (props) => <ul className="list-disc pl-5 text-white" {...props} />,
              li: (props) => <li className="mb-1" {...props} />,
              img: (props) => (
                <img
                  {...props}
                  className=" max-h-100 object-contain rounded-md my-4 mx-auto"
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>

        </div>

        <div className="flex flex-wrap gap-4 my-6">
          <button
            onClick={() => handleAction('like')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            👍 {likes}
          </button>
          <button
            onClick={handleShare}
            className="bg-lime-400 text-black px-4 py-2 rounded hover:brightness-90"
          >
            Share
          </button>
          <button
            onClick={() => setShowCommentBox(prev => !prev)}
            className="border border-indigo-600 text-indigo-300 px-4 py-2 rounded"
          >
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
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Post Comment
            </button>
          </form>
        )}

        <div className="my-6">
          <h3 className="text-2xl font-bold mb-4">Comments</h3>
          <ul className="space-y-4">
            {comments.map((c, i) => (
              <RecursiveComment key={i} comment={c} path={[i]} onAction={handleAction} />
            ))}
          </ul>
        </div>
      </article>

      {/* Sidebar */}
      <aside className="w-full lg:w-72 px-6 py-10 flex flex-col items-center bg-gray-800 lg:min-h-screen">
        <div className="text-center">
          <h3 className="text-lime-400 font-bold text-xl mb-3">Sponsored</h3>
          <img
            src="/ad-placeholder.jpg"
            alt="Advertisement"
            className="rounded-lg mb-4 w-full object-cover h-60"
          />
          <p className="text-sm text-gray-300">Looking to grow your audience? Try our service now.</p>
        </div>
      </aside>
    </div>
  );
}
