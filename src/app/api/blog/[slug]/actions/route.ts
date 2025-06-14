import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';
import { dbConnect } from '@/lib/mongodb';

function buildDotPath(path: number[], field: string) {
  let dot = 'comments';
  for (let i = 0; i < path.length; i++) {
    dot += `.${path[i]}`;
    if (i < path.length - 1) dot += '.replies';
  }
  return `${dot}.${field}`;
}

function buildRepliesPath(path: number[]) {
  let dot = 'comments';
  for (let i = 0; i < path.length; i++) {
    dot += `.${path[i]}`;
    if (i < path.length - 1) dot += '.replies';
  }
  return `${dot}.replies`;
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  await dbConnect();
  const { action, name, text, path = [], reply } = await req.json();

  if (action === 'like') {
    await BlogPost.updateOne({ slug: params.slug }, { $inc: { likes: 1 } });
  } else if (action === 'comment' && name && text) {
    await BlogPost.updateOne(
      { slug: params.slug },
      { $push: { comments: { name, text, date: new Date(), likes: 0, replies: [] } } }
    );
  } else if (action === 'like-comment' && Array.isArray(path)) {
    const dot = buildDotPath(path, 'likes');
    await BlogPost.updateOne(
      { slug: params.slug },
      { $inc: { [dot]: 1 } }
    );
  } else if (action === 'reply-comment' && Array.isArray(path) && reply && reply.name && reply.text) {
    const dot = buildRepliesPath(path);
    await BlogPost.updateOne(
      { slug: params.slug },
      { $push: { [dot]: { ...reply, date: new Date(), likes: 0, replies: [] } } }
    );
  }

  const post = await BlogPost.findOne({ slug: params.slug });
  return NextResponse.json(post);
}