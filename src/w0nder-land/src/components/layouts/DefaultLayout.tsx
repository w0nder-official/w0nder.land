import Link from 'next/link';
import { ReactNode } from 'react';

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <div className="relative w-full min-h-screen bg-[#FFDB58] flex flex-col items-center">
    <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle,_#000_1px,_transparent_2px)] [background-size:14px_14px] opacity-40" />

    <main className="z-10 w-full max-w-xl h-full flex-1 flex flex-col items-center justify-start pr-2 overflow-hidden">
      <div className="w-full bg-[#FFF4E5] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8 pr-3 overflow-hidden">
        {children}
      </div>
    </main>

    <footer className="w-full max-w-3xl h-full flex-1 flex flex-row items-center justify-between p-4 gap-4">
      <span className="py-2">@2025, w0nder</span>
      <Link href="/rss.xml" target="_blank" className="py-2">
        RSS
      </Link>
    </footer>
  </div>
);
