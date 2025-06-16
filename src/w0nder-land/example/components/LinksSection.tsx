import React from 'react';
import { LinkButton } from './LinkButton';

interface LinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  rotate?: boolean;
  size?: 'normal' | 'large';
}

interface LinksSectionProps {
  links: LinkItem[];
}

export function LinksSection({ links }: LinksSectionProps) {
  return (
    <div className="px-4 space-y-6 mb-6 relative">
      {/* Section divider */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-neo-yellow border-brutal px-6 py-2 shadow-brutal">
          <h2 className="font-brutal text-black m-0 uppercase tracking-wider">LINKS</h2>
        </div>
      </div>
      
      {links.map((link, index) => (
        <div key={link.id} className="relative">
          <LinkButton
            title={link.title}
            description={link.description}
            url={link.url}
            icon={link.icon}
            bgColor={link.bgColor}
            textColor={link.textColor}
            borderColor={link.borderColor}
            rotate={link.rotate}
            size={link.size}
          />
          
          {/* Random decorative elements */}
          {index % 3 === 0 && (
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-neo-pink border-2 border-black z-0"></div>
          )}
          {index % 4 === 0 && (
            <div className="absolute -left-2 -bottom-2 w-4 h-4 bg-neo-lime border-2 border-black z-0"></div>
          )}
          {index % 5 === 0 && (
            <div className="absolute -right-1 -bottom-1 w-3 h-8 bg-neo-orange border-2 border-black z-0"></div>
          )}
        </div>
      ))}
      
      {/* Bottom decorative banner */}
      <div className="bg-neo-red border-brutal shadow-brutal-lg p-4 mt-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-8 h-8 bg-white border-2 border-black"></div>
          <p className="text-white font-brutal m-0 uppercase tracking-wider">MORE COMING SOON</p>
          <div className="w-8 h-8 bg-white border-2 border-black"></div>
        </div>
      </div>
    </div>
  );
}