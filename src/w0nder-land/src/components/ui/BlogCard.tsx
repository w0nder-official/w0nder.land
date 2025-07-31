import { BrutalBadge } from './BrutalBadge';
import { BrutalButton } from './BrutalButton';
import { BlogPost } from './types';

export function BlogCard({ title, excerpt, date, readTime, category, accentColor }: BlogPost) {
  return (
    <div className="flex flex-col">
      {/* Category Badge */}
      <div className="p-6 pb-0">
        <BrutalBadge accentColor={accentColor} shadowSize="sm" borderSize="2" className="px-3 py-1 text-sm">
          {category}
        </BrutalBadge>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-base font-black text-gray-600">{date}</span>
            <span className="text-base font-black text-gray-600">• {readTime}</span>
          </div>
          <h2 className="text-2xl font-black text-black mb-4 leading-tight">{title}</h2>
          <p className="text-black mb-6 leading-relaxed text-lg">{excerpt}</p>
        </div>
        <BrutalButton
          variant="accent"
          accentColor={accentColor}
          shadowSize="md"
          className="self-start px-6 py-3 text-base">
          READ MORE
        </BrutalButton>
      </div>
    </div>
  );
}
