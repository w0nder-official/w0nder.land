import { ReactNode } from 'react';
import { Nav } from '@/components/navigation/Nav';
import Link from 'next/link';

export const DefaultLayout = ({ fullHeight, children }: { fullHeight?: boolean; children: ReactNode }) => (
  <div className={fullHeight ? FullHeightWrapperStyle : WrapperStyle}>
    <div className="w-full max-w-3xl pb-5 px-2">
      <Nav />
    </div>

    <main className="w-full max-w-3xl h-full">{children}</main>

    <footer className="w-full max-w-3xl mx-2 p-2 my-10 flex gap-4">
      <span className="py-2">@2024, w0nder</span>
      <Link href="/rss.xml" target="_blank" className="py-2">
        RSS
      </Link>
    </footer>
  </div>
);

const FullHeightWrapperStyle = 'h-svh w-full flex flex-col items-center';
const WrapperStyle = 'w-full flex flex-col items-center';
