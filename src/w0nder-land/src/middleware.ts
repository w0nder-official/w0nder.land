import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/** 구 글 permalink 가 하드코딩된 UUID 였을 때 → 글 id 1 로 합류 (이후 next.config 가 정규 slug 로 리다이렉트) */
const LEGACY_POST_SLUG_PREFIX = '28626b62da0242528bfe5f6873bb32bb';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const m = pathname.match(/^\/posts\/(.+)$/);
  if (!m) {
    return NextResponse.next();
  }
  const slug = m[1];
  if (slug === LEGACY_POST_SLUG_PREFIX || slug.startsWith(`${LEGACY_POST_SLUG_PREFIX}-`)) {
    return NextResponse.redirect(new URL('/posts/1', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/posts/:slug*'],
};
