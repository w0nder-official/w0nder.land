export type AccentColor = 'yellow-400' | 'pink-400' | 'cyan-400' | 'green-400' | 'blue-400' | 'purple-400' | 'gray-400';
export type Category = 'TECH' | 'BUSINESS' | 'DESIGN' | 'LIFE' | 'REVIEW' | 'PLAN' | 'OTHER';

// 카테고리 색상 매핑
export const getCategoryColor = (category: string, tags: string[] = []): AccentColor => {
  // 먼저 category 필드 확인
  if (category) {
    switch (category.toUpperCase()) {
      case 'TECH':
        return 'blue-400';
      case 'BUSINESS':
        return 'pink-400';
      case 'DESIGN':
        return 'yellow-400';
      case 'LIFE':
        return 'cyan-400';
      case 'REVIEW':
        return 'green-400';
      case 'PLAN':
        return 'purple-400';
      default:
        return 'gray-400';
    }
  }

  // fallback: tags 기반 매핑
  if (
    tags.includes('개발') ||
    tags.includes('ReactNative') ||
    tags.includes('RN') ||
    tags.includes('앱개발') ||
    tags.includes('프로그래밍')
  ) {
    return 'blue-400';
  }
  if (tags.includes('ASO') || tags.includes('마케팅') || tags.includes('트래픽') || tags.includes('비즈니스')) {
    return 'pink-400';
  }
  if (tags.includes('UI/UX') || tags.includes('디자인') || tags.includes('A/B 테스트') || tags.includes('사용자경험')) {
    return 'yellow-400';
  }
  if (
    tags.includes('생각') ||
    tags.includes('자기성찰') ||
    tags.includes('관계') ||
    tags.includes('AI') ||
    tags.includes('철학')
  ) {
    return 'cyan-400';
  }
  if (tags.includes('리뷰') || tags.includes('독서') || tags.includes('책')) {
    return 'green-400';
  }
  if (tags.includes('만다라트') || tags.includes('계획') || tags.includes('목표')) {
    return 'purple-400';
  }
  return 'gray-400';
};

// 카테고리 이름 매핑
export const getCategoryName = (category: string, tags: string[] = []): Category => {
  // 먼저 category 필드 확인
  if (category) {
    const upperCategory = category.toUpperCase();
    if (['TECH', 'BUSINESS', 'DESIGN', 'LIFE', 'REVIEW', 'PLAN', 'OTHER'].includes(upperCategory)) {
      return upperCategory as Category;
    }
  }

  // fallback: tags 기반 매핑
  if (
    tags.includes('개발') ||
    tags.includes('ReactNative') ||
    tags.includes('RN') ||
    tags.includes('앱개발') ||
    tags.includes('프로그래밍')
  ) {
    return 'TECH';
  }
  if (tags.includes('ASO') || tags.includes('마케팅') || tags.includes('트래픽') || tags.includes('비즈니스')) {
    return 'BUSINESS';
  }
  if (tags.includes('UI/UX') || tags.includes('디자인') || tags.includes('A/B 테스트') || tags.includes('사용자경험')) {
    return 'DESIGN';
  }
  if (
    tags.includes('생각') ||
    tags.includes('자기성찰') ||
    tags.includes('관계') ||
    tags.includes('AI') ||
    tags.includes('철학')
  ) {
    return 'LIFE';
  }
  if (tags.includes('리뷰') || tags.includes('독서') || tags.includes('책')) {
    return 'REVIEW';
  }
  if (tags.includes('만다라트') || tags.includes('계획') || tags.includes('목표')) {
    return 'PLAN';
  }
  return 'OTHER';
};

// 카테고리별 색상 매핑
const categoryColorMap: Record<Category, string> = {
  TECH: 'bg-blue-400 text-black',
  BUSINESS: 'bg-pink-400 text-black',
  DESIGN: 'bg-yellow-400 text-black',
  LIFE: 'bg-cyan-400 text-black',
  REVIEW: 'bg-green-400 text-black',
  PLAN: 'bg-purple-400 text-black',
  OTHER: 'bg-gray-400 text-black',
};

// 포스트 데이터를 기반으로 동적으로 카테고리 목록 생성
export const generateCategories = (posts: Array<{ category?: string; tags: string[] }>) => {
  const categoryCounts = new Map<Category, number>();

  // 각 포스트의 카테고리를 분석하여 카운트
  posts.forEach(post => {
    const category = getCategoryName(post.category || '', post.tags);
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  });

  // ALL 카테고리 추가
  const categories = [{ name: 'ALL', color: 'bg-black text-white', count: posts.length }];

  // 카테고리별로 정렬 (포스트 수가 많은 순)
  const sortedCategories = Array.from(categoryCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([category, count]) => ({
      name: category,
      color: categoryColorMap[category],
      count,
    }));

  return [...categories, ...sortedCategories];
};

// 기본 카테고리 목록 (하위 호환성을 위해 유지)
export const categories = [
  { name: 'ALL', color: 'bg-black text-white' },
  { name: 'TECH', color: 'bg-blue-400 text-black' },
  { name: 'BUSINESS', color: 'bg-pink-400 text-black' },
  { name: 'DESIGN', color: 'bg-yellow-400 text-black' },
  { name: 'LIFE', color: 'bg-cyan-400 text-black' },
  { name: 'REVIEW', color: 'bg-green-400 text-black' },
  { name: 'PLAN', color: 'bg-purple-400 text-black' },
];
