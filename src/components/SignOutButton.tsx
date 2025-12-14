"use client";
import React from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function SignOutButton(){
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })} className="px-3 py-1 bg-white/5 rounded">Sign out</button>
  );
}
