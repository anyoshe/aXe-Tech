/**
 * @deprecated Blog will move to Supabase. MongoDB model removed.
 */
export type BlogPost = {
  slug: string;
  title: string;
  content?: string;
  tags?: string[];
  date?: string;
};

const BlogPostModel = null as unknown as never;
export default BlogPostModel;
