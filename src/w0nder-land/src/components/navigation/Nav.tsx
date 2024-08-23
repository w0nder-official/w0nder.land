import Link from 'next/link';

export const Nav = () => (
  <nav className="flex flex-row gap-3 flex-1 h-20 items-center">
    <Link href="/" className={HomeMenuStyle}>
      w0nder.land
    </Link>

    <ul className="flex h-full flex-row gap-3 flex-1 justify-end">
      <Link href="/posts" className={NavMenuWrapperStyle}>
        <li className={NavMenuStyle}>글 목록</li>
      </Link>
      <Link href="/about" className={NavMenuWrapperStyle}>
        <li className={NavMenuStyle}>소개</li>
      </Link>
    </ul>
  </nav>
);

const HomeMenuStyle = 'px-2 font-extrabold text-4xl border-b-2 border-b-blue-800';
const NavMenuStyle = 'px-2 border-b-2 hover:border-b-fuchsia-500';
const NavMenuWrapperStyle = 'flex items-center';
