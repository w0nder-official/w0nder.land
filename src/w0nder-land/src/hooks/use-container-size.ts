import { useEffect, useState, RefObject } from 'react';

type ContainerSize = {
  width: number;
  height: number;
};

type UseContainerSizeOptions = {
  enabled?: boolean;
  containerRef: RefObject<HTMLDivElement>;
};

export function useContainerSize({ enabled = true, containerRef }: UseContainerSizeOptions) {
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!enabled || !containerRef.current) {
      return undefined;
    }

    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };

    // 초기 크기 측정
    updateSize();

    // ResizeObserver로 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [enabled, containerRef]);

  return { size };
}
