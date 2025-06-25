import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';
import { dbConnect } from '@/lib/mongodb';


// GET all posts or filter by tag
export async function GET(req: NextRequest) {
  await dbConnect();
  const tag = req.nextUrl.searchParams.get('tag');
  let posts;
  if (tag) {
    posts = await BlogPost.find({ tags: tag }).sort({ date: -1 });
  } else {
    posts = await BlogPost.find().sort({ date: -1 });
  }
  return NextResponse.json(posts);
}


// POST a new blog
export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const post = await BlogPost.create(data);
  return NextResponse.json(post);
}

