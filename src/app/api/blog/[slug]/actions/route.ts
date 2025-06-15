import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';
import { dbConnect } from '@/lib/mongodb';

// Helpers to build MongoDB dot paths for nested comment fields
function buildDotPath(path: number[], field: string) {
  return path.reduce((acc, curr, idx) => {
    return `${acc}.${curr}${idx < path.length - 1 ? '.replies' : ''}`;
  }, 'comments') + `.${field}`;
}

function buildRepliesPath(path: number[]) {
  return path.reduce((acc, curr, idx) => {
    return `${acc}.${curr}${idx < path.length - 1 ? '.replies' : ''}`;
  }, 'comments') + '.replies';
}

export async function POST(req: NextRequest) {
  await dbConnect();

const segments = req.nextUrl.pathname.split('/');
const slugIndex = segments.indexOf('blog') + 1;
const slug = segments[slugIndex] || null;

  if (!slug) {
    return NextResponse.json({ error: 'Slug not found in URL' }, { status: 400 });
  }

  const { action, name, text, path = [], reply } = await req.json();

  try {
    switch (action) {
      case 'like':
        await BlogPost.updateOne({ slug }, { $inc: { likes: 1 } });
        break;

      case 'comment':
        if (name && text) {
          await BlogPost.updateOne(
            { slug },
            {
              $push: {
                comments: {
                  name,
                  text,
                  date: new Date(),
                  likes: 0,
                  replies: [],
                },
              },
            }
          );
        }
        break;

      case 'like-comment':
        if (Array.isArray(path)) {
          const dot = buildDotPath(path, 'likes');
          await BlogPost.updateOne({ slug }, { $inc: { [dot]: 1 } });
        }
        break;

      case 'reply-comment':
        if (Array.isArray(path) && reply?.name && reply?.text) {
          const dot = buildRepliesPath(path);
          await BlogPost.updateOne(
            { slug },
            {
              $push: {
                [dot]: {
                  ...reply,
                  date: new Date(),
                  likes: 0,
                  replies: [],
                },
              },
            }
          );
        }
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const post = await BlogPost.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
