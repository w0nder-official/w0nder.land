import { useRef } from 'react';
import { AdFormat } from '@/constants/ads';
import { useContainerSize } from '@/hooks/use-container-size';
import { getAdFormatMinHeight, getAdFormatLabel } from './adFormatUtils';

type TestAdProps = {
  adSlot: string;
  adFormat: AdFormat;
  className?: string;
  style?: React.CSSProperties;
};

export function TestAd({ adSlot, adFormat, className = '', style }: TestAdProps) {
  const minHeight = getAdFormatMinHeight(adFormat);
  const containerRef = useRef<HTMLDivElement>(null);
  const { size } = useContainerSize({ enabled: true, containerRef });

  return (
    <div
      ref={containerRef}
      className={`adsense-container ${className}`}
      style={{
        display: 'block',
        textAlign: 'center',
        minHeight,
        width: '100%',
        ...style,
      }}>
      <div
        className="flex items-center justify-center border-2 border-dashed border-gray-400 bg-gray-100"
        style={{
          minHeight,
          width: '100%',
          minWidth: '200px',
        }}>
        <div className="text-center p-4">
          <div className="text-sm font-bold text-gray-600 mb-1">테스트 광고</div>
          <div className="text-xs text-gray-500 break-all">{adSlot}</div>
          <div className="text-xs text-gray-400 mt-1">
            {getAdFormatLabel(adFormat)}
            {size.width > 0 && size.height > 0 && (
              <span className="ml-2 text-gray-500">
                (실제: {Math.round(size.width)}x{Math.round(size.height)})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
