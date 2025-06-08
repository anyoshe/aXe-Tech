// app/digital-talk/page.tsx
import { getAllPosts } from '@/lib/getAllPosts';
import DigitalTalkClient from '../../components/DigitalTalkClient';
export default async function DigitalTalkPage() {
  const posts = await getAllPosts();

  return <DigitalTalkClient posts={posts} />;
}
