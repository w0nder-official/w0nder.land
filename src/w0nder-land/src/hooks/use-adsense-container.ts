import { useRef, useEffect, useState } from 'react';
import { INTERSECTION_OBSERVER_CONFIG } from '@/constants/ads';

type UseAdSenseContainerOptions = {
  enableLazyLoad?: boolean;
  fitToContainer?: boolean;
};

export function useAdSenseContainer({
  enableLazyLoad = true,
  fitToContainer = false,
}: UseAdSenseContainerOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!enableLazyLoad);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!enableLazyLoad || !containerRef.current || isVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: INTERSECTION_OBSERVER_CONFIG.rootMargin },
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enableLazyLoad, isVisible]);

  useEffect(() => {
    if (!fitToContainer || !containerRef.current) {
      return undefined;
    }

    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [fitToContainer]);

  return {
    containerRef,
    isVisible,
    containerSize,
  };
}
