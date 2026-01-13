import { useEffect, useRef, useState } from 'react';
import { AdFormat } from '@/constants/ads';

type AdSenseProps = {
  adSlot: string;
  adFormat?: AdFormat;
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
  enableLazyLoad?: boolean;
  showTestAd?: boolean;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSense({
  adSlot,
  adFormat = AdFormat.AUTO,
  style,
  className = '',
  fullWidthResponsive = true,
  enableLazyLoad = true,
  showTestAd = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SHOW_TEST_ADS === 'true',
}: AdSenseProps) {
  const [isVisible, setIsVisible] = useState(!enableLazyLoad);
  const adRef = useRef<HTMLDivElement>(null);
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!isVisible && enableLazyLoad) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '50px' },
      );

      if (adRef.current) {
        observer.observe(adRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
    return undefined;
  }, [isVisible, enableLazyLoad]);

  useEffect(() => {
    if (isVisible && typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // AdSense 로딩 실패 시 조용히 처리 (콘솔 스팸 방지)
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('AdSense loading error:', err);
        }
      }
    }
  }, [isVisible]);

  // 개발 환경에서 테스트 광고 표시
  if (showTestAd || (isDevelopment && adSlot.startsWith('YOUR_'))) {
    return (
      <div
        className={`adsense-container ${className}`}
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '100px',
          ...style,
        }}>
        <div
          className="flex items-center justify-center border-2 border-dashed border-gray-400 bg-gray-100"
          style={{
            minHeight: (() => {
              if (adFormat === AdFormat.RECTANGLE) {
                return '250px';
              }
              if (adFormat === AdFormat.IN_ARTICLE) {
                return '200px';
              }
              return '90px';
            })(),
            width: '100%',
          }}>
          <div className="text-center p-4">
            <div className="text-sm font-bold text-gray-600 mb-1">테스트 광고</div>
            <div className="text-xs text-gray-500">{adSlot}</div>
            <div className="text-xs text-gray-400 mt-1">
              {(() => {
                if (adFormat === AdFormat.AUTO) {
                  return '728x90 (반응형)';
                }
                if (adFormat === AdFormat.RECTANGLE) {
                  return '300x250';
                }
                if (adFormat === AdFormat.IN_ARTICLE) {
                  return 'In-article (반응형)';
                }
                return adFormat;
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className={`adsense-container ${className}`}
      style={{
        display: 'block',
        textAlign: 'center',
        minHeight: enableLazyLoad && !isVisible ? '100px' : 'auto',
        ...style,
      }}>
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            ...(fullWidthResponsive ? {} : { width: '100%', maxWidth: '728px', margin: '0 auto' }),
          }}
          data-ad-client="ca-pub-9562383946948731"
          data-ad-slot={adSlot}
          {...(() => {
            if (adFormat === AdFormat.IN_ARTICLE) {
              return {
                'data-ad-layout': 'in-article',
                'data-ad-format': 'fluid',
              };
            }
            return {
              'data-ad-format': adFormat,
              'data-full-width-responsive': fullWidthResponsive ? 'true' : 'false',
            };
          })()}
        />
      )}
    </div>
  );
}

// 사전 정의된 광고 유닛 타입들
export function AdBanner({ className = '', enableLazyLoad = true }: { className?: string; enableLazyLoad?: boolean }) {
  return (
    <div className={`my-8 ${className}`}>
      <AdSense
        adSlot="YOUR_BANNER_AD_SLOT"
        adFormat={AdFormat.AUTO}
        fullWidthResponsive
        enableLazyLoad={enableLazyLoad}
        className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    </div>
  );
}

export function AdRectangle({
  className = '',
  enableLazyLoad = true,
}: {
  className?: string;
  enableLazyLoad?: boolean;
}) {
  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <AdSense
        adSlot="YOUR_RECTANGLE_AD_SLOT"
        adFormat={AdFormat.RECTANGLE}
        fullWidthResponsive
        enableLazyLoad={enableLazyLoad}
        className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    </div>
  );
}
