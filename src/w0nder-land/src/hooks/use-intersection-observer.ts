import { useEffect, useRef, useState } from 'react';

type UseIntersectionObserverOptions = {
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
};

export function useIntersectionObserver({
  enabled = true,
  rootMargin = '50px',
  threshold,
}: UseIntersectionObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(!enabled);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || isVisible) {
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
      { rootMargin, threshold },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [enabled, isVisible, rootMargin, threshold]);

  return { isVisible, elementRef };
}
