import Link from 'next/link';

export const Nav = () => (
  <nav className="flex flex-row gap-3 flex-1 h-20 items-center">
    <Link href="/" className="px-2 font-extrabold text-3xl border-b-2 border-b-blue-800">
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

const NavMenuWrapperStyle = 'flex items-center';
const NavMenuStyle = 'px-2 border-b-2 hover:border-b-fuchsia-500';
