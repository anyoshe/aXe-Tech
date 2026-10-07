import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="text-black/70 mb-6">
        The blog is being migrated to Supabase. Check back soon.
      </p>
      <Link href="/" className="underline text-sm">
        ← Back home
      </Link>
    </main>
  );
}
