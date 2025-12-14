"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", { redirect: false, email, password });
      // @ts-ignore
      if (res?.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      // Successful - redirect to dashboard
      router.push("/");
    } catch (err: any) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-white/5 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Sign in to GetAxe Demo</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-black/20 mt-1" placeholder="demo@school-id.example" />
          </div>
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-black/20 mt-1" placeholder="demo" />
          </div>
          {error && <div className="text-sm text-red-400">{error}</div>}
          <div className="flex items-center gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[var(--color-accent)] text-black rounded">{loading ? "Signing in..." : "Sign in"}</button>
            <button type="button" onClick={() => { setEmail('demo-school'); setPassword('demo'); }} className="px-3 py-2 bg-white/5 rounded">Use demo</button>
          </div>
        </form>

        <div className="mt-4 text-sm text-gray-400">
          To create a demo school: POST to <code className="bg-black/20 px-1 rounded">/api/schools/&lt;schoolId&gt;/seed</code>. After seeding, use email <code className="bg-black/20 px-1 rounded">demo@&lt;schoolId&gt;.example</code> and password <code className="bg-black/20 px-1 rounded">demo</code> to sign in.
        </div>
      </div>
    </div>
  );
}
