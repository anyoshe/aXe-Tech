// import { NextRequest, NextResponse } from 'next/server';
// import BlogPost from '@/models/BlogPost';
// import { dbConnect } from '@/lib/mongodb';


// // GET all posts or filter by tag
// export async function GET(req: NextRequest) {
//   await dbConnect();
//   const tag = req.nextUrl.searchParams.get('tag');
//   let posts;
//   if (tag) {
//     posts = await BlogPost.find({ tags: tag }).sort({ date: -1 });
//   } else {
//     posts = await BlogPost.find().sort({ date: -1 });
//   }
//   return NextResponse.json(posts);
// }


// // POST a new blog
// export async function POST(req: NextRequest) {
//   await dbConnect();
//   const data = await req.json();
//   const post = await BlogPost.create(data);
//   return NextResponse.json(post);
// }


import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '@/models/BlogPost';
import { dbConnect } from '@/lib/mongodb';

// Helper function to safely get error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

// GET all posts or filter by tag
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const tag = req.nextUrl.searchParams.get('tag');
    let posts;
    
    if (tag) {
      posts = await BlogPost.find({ tags: tag }).sort({ date: -1 });
    } else {
      posts = await BlogPost.find().sort({ date: -1 });
    }
    
    console.log(`Found ${posts.length} blog posts`);
    return NextResponse.json(posts);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error('Error in blog API route:', errorMessage);
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}

// POST a new blog
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const post = await BlogPost.create(data);
    return NextResponse.json(post);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error('Error creating blog post:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to create blog post', details: errorMessage },
      { status: 500 }
    );
  }
}