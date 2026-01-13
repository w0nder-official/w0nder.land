import { useEffect, useRef } from 'react';
import { AdFormat, AD_CLIENT_ID, DEFAULT_AD_CONTAINER_STYLE } from '@/constants/ads';
import { getAdFormatStyle, getAdFormatAttributes } from './adFormatUtils';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdSenseAdProps = {
  adSlot: string;
  adFormat: AdFormat;
  fullWidthResponsive: boolean;
  style?: React.CSSProperties;
};

export function AdSenseAd({ adSlot, adFormat, fullWidthResponsive, style }: AdSenseAdProps) {
  const hasPushed = useRef(false);

  useEffect(() => {
    if (hasPushed.current || typeof window === 'undefined' || !window.adsbygoogle) {
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
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        ...DEFAULT_AD_CONTAINER_STYLE,
        ...getAdFormatStyle(adFormat, fullWidthResponsive),
        ...style,
      }}
      data-ad-client={AD_CLIENT_ID}
      data-ad-slot={adSlot}
      {...getAdFormatAttributes(adFormat, fullWidthResponsive)}
    />
  );
}
