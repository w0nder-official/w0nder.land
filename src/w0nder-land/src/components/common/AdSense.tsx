import { useMemo } from 'react';
import { AdFormat, DEFAULT_AD_CONTAINER_STYLE, LAZY_LOAD_MIN_HEIGHT } from '@/constants/ads';
import { useAdSenseContainer } from '@/hooks/use-adsense-container';
import { TestAd } from './TestAd';
import { AdSenseAd } from './AdSenseAd';
import { getAdFormatStyleByContainer } from './adFormatUtils';

type AdSenseProps = {
  adSlot: string;
  adFormat?: AdFormat;
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
  enableLazyLoad?: boolean;
  fitToContainer?: boolean;
};

export function AdSense({
  adSlot,
  adFormat = AdFormat.AUTO,
  style,
  className = '',
  fullWidthResponsive = true,
  enableLazyLoad = true,
  fitToContainer = false,
}: AdSenseProps) {
  const isEmptySlot = !adSlot || adSlot.trim() === '';

  const { containerRef, isVisible, containerSize } = useAdSenseContainer({
    enableLazyLoad: !isEmptySlot && enableLazyLoad,
    fitToContainer: !isEmptySlot && fitToContainer,
  });

  const adStyle = useMemo(() => {
    if (fitToContainer && containerSize.width > 0 && containerSize.height > 0) {
      return getAdFormatStyleByContainer(adFormat, containerSize.width, containerSize.height);
    }
    return undefined;
  }, [fitToContainer, containerSize.width, containerSize.height, adFormat]);

  const containerStyle = useMemo(
    () => ({
      ...DEFAULT_AD_CONTAINER_STYLE,
      minHeight: enableLazyLoad && !isVisible ? LAZY_LOAD_MIN_HEIGHT : 'auto',
      ...style,
    }),
    [enableLazyLoad, isVisible, style],
  );

  if (isEmptySlot) {
    return <TestAd adSlot={adSlot || ''} adFormat={adFormat} className={className} style={style} />;
  }

  return (
    <div ref={containerRef} className={`adsense-container ${className}`} style={containerStyle}>
      {isVisible && (
        <AdSenseAd adSlot={adSlot} adFormat={adFormat} fullWidthResponsive={fullWidthResponsive} style={adStyle} />
      )}
    </div>
  );
}
