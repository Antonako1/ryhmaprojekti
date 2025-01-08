'use client'

import { useAuth } from '@/Utils/context/contextUser';
import Link from 'next/link';
import { useEffect } from 'react';
export default function Home() {
  const { user, authenticated } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [authenticated]);
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/LoginRegister">Login</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  );
}