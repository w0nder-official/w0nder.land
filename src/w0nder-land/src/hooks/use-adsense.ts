import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function useAdSense(isVisible: boolean) {
  const hasPushed = useRef(false);

  useEffect(() => {
    if (!isVisible || hasPushed.current || typeof window === 'undefined' || !window.adsbygoogle) {
      return undefined;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      hasPushed.current = true;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('AdSense loading error:', err);
      }
    }

    return undefined;
  }, [isVisible]);
}
