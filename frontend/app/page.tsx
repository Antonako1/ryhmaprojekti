import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/LoginRegister">Login</Link>
      </li>
      <li>
        <Link href="/Reviews">Reviews</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  );
}