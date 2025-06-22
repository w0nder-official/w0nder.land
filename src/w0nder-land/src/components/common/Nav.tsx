import Link from 'next/link';

// NavProps 타입 정의
type NavProps = {
  title?: string;
  leftUrl?: string;
};

export const Nav = ({ title, leftUrl }: NavProps) => (
  <nav className="relative flex items-center border-b-4 border-gray-700 bg-neo-yellow">
    <Link href={leftUrl || '/'} className="border-r-4 border-gray-700 py-3 px-4 bg-yellow-400">
      <i className="ri-arrow-left-line text-3xl font-bold" />
    </Link>

    <span className="absolute left-1/2 -translate-x-1/2 text-4xl font-bold flex-1 text-center truncate">{title}</span>
  </nav>
);
