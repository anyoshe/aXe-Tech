import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';
import { dbConnect } from '@/lib/mongodb';

// DELETE a blog post by slug
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  const deleted = await BlogPost.findOneAndDelete({ slug: params.slug });
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

// UPDATE a blog post by slug
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  const data = await req.json();
  const updated = await BlogPost.findOneAndUpdate({ slug: params.slug }, data, { new: true });
  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(updated);
}