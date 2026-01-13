import { AdFormat, AD_CLIENT_ID, DEFAULT_AD_CONTAINER_STYLE } from '@/constants/ads';
import { getAdFormatStyle, getAdFormatAttributes } from './adFormatUtils';

type AdSenseAdProps = {
  adSlot: string;
  adFormat: AdFormat;
  fullWidthResponsive: boolean;
  style?: React.CSSProperties;
};

export function AdSenseAd({ adSlot, adFormat, fullWidthResponsive, style }: AdSenseAdProps) {
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
