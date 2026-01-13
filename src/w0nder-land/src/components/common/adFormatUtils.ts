import { AdFormat } from '@/constants/ads';

type AdFormatMetadata = {
  width: number;
  height: number;
  label: string;
  maxWidth?: number;
};

const AD_FORMAT_METADATA: Record<AdFormat, AdFormatMetadata> = {
  [AdFormat.AUTO]: {
    width: 728,
    height: 90,
    label: '728x90 (반응형)',
    maxWidth: 728,
  },
  [AdFormat.RECTANGLE]: {
    width: 300,
    height: 250,
    label: '300x250',
    maxWidth: 300,
  },
  [AdFormat.HORIZONTAL]: {
    width: 728,
    height: 90,
    label: '728x90 (Horizontal)',
    maxWidth: 728,
  },
  [AdFormat.VERTICAL]: {
    width: 160,
    height: 600,
    label: '160x600 (Vertical)',
    maxWidth: 160,
  },
  [AdFormat.IN_ARTICLE]: {
    width: 0, // 반응형이므로 고정값 없음
    height: 200, // 테스트용 최소 높이
    label: 'In-article (반응형)',
  },
} as const;

export function getAdFormatMinHeight(adFormat: AdFormat): string {
  const metadata = AD_FORMAT_METADATA[adFormat];
  if (!metadata) {
    throw new Error(`Unsupported ad format: ${adFormat}`);
  }
  return `${metadata.height}px`;
}

export function getAdFormatLabel(adFormat: AdFormat): string {
  const metadata = AD_FORMAT_METADATA[adFormat];
  if (!metadata) {
    throw new Error(`Unsupported ad format: ${adFormat}`);
  }
  return metadata.label;
}

export function getAdFormatStyle(adFormat: AdFormat, fullWidthResponsive: boolean): React.CSSProperties {
  const metadata = AD_FORMAT_METADATA[adFormat];
  if (!metadata) {
    throw new Error(`Unsupported ad format: ${adFormat}`);
  }

  if (adFormat === AdFormat.HORIZONTAL && metadata.maxWidth) {
    return { width: '100%', maxWidth: `${metadata.maxWidth}px`, margin: '0 auto' };
  }
  if (!fullWidthResponsive && metadata.maxWidth) {
    return { width: '100%', maxWidth: `${metadata.maxWidth}px`, margin: '0 auto' };
  }
  return {};
}

export function getAdFormatStyleByContainer(
  adFormat: AdFormat,
  containerWidth: number,
  containerHeight: number,
): React.CSSProperties {
  const metadata = AD_FORMAT_METADATA[adFormat];
  if (!metadata) {
    throw new Error(`Unsupported ad format: ${adFormat}`);
  }

  // IN_ARTICLE은 반응형이므로 부모 크기에 맞춤
  if (adFormat === AdFormat.IN_ARTICLE) {
    return {
      width: '100%',
      maxWidth: `${containerWidth}px`,
      height: 'auto',
    };
  }

  // 컨테이너가 너무 작으면 기본 스타일 반환
  if (containerWidth < 160 || containerHeight < 90) {
    return { width: '100%', maxWidth: `${containerWidth}px` };
  }

  // 컨테이너 크기에 맞춰 최적 크기 계산
  const aspectRatio = metadata.width / metadata.height;
  let optimalWidth = containerWidth;
  let optimalHeight = containerWidth / aspectRatio;

  // 높이가 컨테이너를 초과하면 높이 기준으로 조정
  if (optimalHeight > containerHeight) {
    optimalHeight = containerHeight;
    optimalWidth = containerHeight * aspectRatio;
  }

  // 최대 너비 제한 (메타데이터의 maxWidth가 있으면 적용)
  if (metadata.maxWidth && optimalWidth > metadata.maxWidth) {
    optimalWidth = metadata.maxWidth;
    optimalHeight = optimalWidth / aspectRatio;
  }

  return {
    width: `${optimalWidth}px`,
    height: `${optimalHeight}px`,
    maxWidth: '100%',
    margin: '0 auto',
  };
}

export function getAdFormatAttributes(adFormat: AdFormat, fullWidthResponsive: boolean): Record<string, string> {
  switch (adFormat) {
    case AdFormat.IN_ARTICLE:
      return {
        'data-ad-layout': 'in-article',
        'data-ad-format': 'fluid',
      };
    case AdFormat.HORIZONTAL:
      return {
        'data-ad-format': 'horizontal',
        'data-full-width-responsive': 'false',
      };
    case AdFormat.AUTO:
    case AdFormat.RECTANGLE:
    case AdFormat.VERTICAL:
      return {
        'data-ad-format': adFormat,
        'data-full-width-responsive': fullWidthResponsive ? 'true' : 'false',
      };
    default:
      throw new Error(`Unsupported ad format: ${adFormat}`);
  }
}
