import { ReactNode } from 'react';
import { Nav } from '@/components/navigation/Nav';

export const DefaultLayout = ({ fullHeight, children }: { fullHeight?: boolean; children: ReactNode }) => (
  <div className={fullHeight ? FullHeightWrapperStyle : WrapperStyle}>
    <div className="w-full max-w-3xl pb-5 px-2">
      <Nav />
    </div>

    <main className="w-full max-w-3xl px-2 h-full">{children}</main>

    <footer className="w-full max-w-3xl mx-2 p-2 my-10">
      <span className="p-2">@2024, w0nder</span>
    </footer>
  </div>
);

const FullHeightWrapperStyle = 'h-svh w-full flex flex-col items-center';
const WrapperStyle = 'w-full flex flex-col items-center';
