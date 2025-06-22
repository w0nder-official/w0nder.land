import Link from 'next/link';
import { ReactNode } from 'react';

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <div className="relative w-full min-h-screen bg-[#FFDB58] flex flex-col items-center">
    <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle,_#000_1px,_transparent_2px)] [background-size:14px_14px] opacity-40" />

    <div className="z-10 w-full max-w-xl h-full flex-1 flex flex-col items-center justify-start pr-2 overflow-hidden">
      <div className="space-y-8 w-full bg-[#FFF4E5] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-4 overflow-hidden">
        <main>{children}</main>

        <footer className="w-full max-w-3xl h-full flex-1 flex flex-row items-center justify-between p-4 gap-4">
          <div className="bg-white border-2 border-black px-4 py-2 inline-block">
            <span className="font-bold text-black text-xs">© 2024 w0nder</span>
          </div>

          <Link
            href="/rss.xml"
            className="bg-white border-2 border-black px-4 py-2 inline-block font-extrabold text-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
            RSS
          </Link>
        </footer>
      </div>
    </div>
  </div>
);
