import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function useAdSense(isVisible: boolean) {
  useEffect(() => {
    if (!isVisible || typeof window === 'undefined' || !window.adsbygoogle) {
      return undefined;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // AdSense 로딩 실패 시 조용히 처리 (콘솔 스팸 방지)
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('AdSense loading error:', err);
      }
    }

    return undefined;
  }, [isVisible]);
}
