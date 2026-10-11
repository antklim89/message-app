import { type RefObject, useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  callback: () => void | Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | Document | null;
}

export const useInfiniteScroll = <T extends HTMLElement = HTMLDivElement>({
  callback,
  hasMore,
  isLoading,
  rootMargin = '100px',
  threshold = 0,
  root,
}: UseInfiniteScrollProps): RefObject<T | null> => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<T | null>(null);

  const handleIntersection = useCallback<IntersectionObserverCallback>(
    async entries => {
      const [entry] = entries;
      if (entry?.isIntersecting && hasMore && !isLoading) {
        await callback();
      }
    },
    [callback, hasMore, isLoading],
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin,
      threshold,
    });

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, rootMargin, threshold, root]);

  return elementRef;
};
