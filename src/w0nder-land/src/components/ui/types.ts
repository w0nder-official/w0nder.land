export interface BlogPost {
  title: string;
  content?: string;
  excerpt?: string;
  date: string;
  readTime: string;
  category: string;
  accentColor: string;
}

export type AccentColor = 'yellow-400' | 'pink-400' | 'cyan-400' | 'green-400' | 'blue-400' | 'purple-400' | 'gray-400';
export type Category = 'TECH' | 'BUSINESS' | 'DESIGN' | 'LIFE' | 'REVIEW' | 'PLAN' | 'OTHER';

// Re-export from category utils for convenience
export { getCategoryColor, getCategoryName, categories } from '@/libs/utils/category';

export interface BrutalStyleProps {
  shadowSize?: 'sm' | 'md' | 'lg';
  borderSize?: '2' | '4';
  className?: string;
}
