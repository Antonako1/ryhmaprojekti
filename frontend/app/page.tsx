'use client'

import { useAuth } from '@/Utils/context/contextUser';
import { UserRoles } from '@/Utils/Interfaces';
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
      {authenticated && user?.role === UserRoles.Admin && (
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      )} 
      <li>
        <Link href="/login-register">Login</Link>
      </li>
      <li>
        <Link href="/reviews">Reviews</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  );
}