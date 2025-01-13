'use client'

import { useAuth } from '@/Utils/context/contextUser';
import { UserRoles } from '@/Utils/Interfaces';
import Link from 'next/link';
import { useEffect } from 'react';
export default function Home() {
  const { user, logout, authenticated } = useAuth();
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      {user?.role === UserRoles.Admin && (
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      )} 
      <li>
        <Link href="/login-register">Login</Link>
      </li>
      {authenticated && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      <li>
        <Link href="/reviews">Reviews</Link>
      </li>
      <li>
        <Link href="/cart">Cart</Link>
      </li>
    </ul>
  );
}