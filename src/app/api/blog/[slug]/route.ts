import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';
import { dbConnect } from '@/lib/mongodb';

// ✅ Helper: Extract slug from pathname
function getSlugFromRequest(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split('/');
  const slugIndex = segments.indexOf('blog') + 1;
  return segments[slugIndex] || null;
}

// ✅ DELETE a blog post by slug
export async function DELETE(req: NextRequest) {
  await dbConnect();

  const slug = getSlugFromRequest(req);
  if (!slug) {
    return NextResponse.json({ error: 'Slug not found in URL' }, { status: 400 });
  }

  const deleted = await BlogPost.findOneAndDelete({ slug });
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

// ✅ UPDATE a blog post by slug
export async function PUT(req: NextRequest) {
  await dbConnect();

  const slug = getSlugFromRequest(req);
  if (!slug) {
    return NextResponse.json({ error: 'Slug not found in URL' }, { status: 400 });
  }

  const data = await req.json();
  const updated = await BlogPost.findOneAndUpdate({ slug }, data, { new: true });

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}
