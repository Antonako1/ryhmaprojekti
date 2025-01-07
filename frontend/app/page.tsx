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
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  );
}
 
/*

const loler = () => {
    console.log('Ty loh, xaxaxa')
    return (
        <div>
            lol
        </div>
    )
};

export default loler;
*/