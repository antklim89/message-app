import { type RefObject, useEffect, useRef } from 'react';

const useInfiniteScroll = ({
  loadMore,
  rootMargin = '0px',
  threshold = 1.0,
  dependencies = [],
}: {
  loadMore?: () => Promise<unknown>;
  dependencies?: unknown[];
} & IntersectionObserverInit): RefObject<HTMLDivElement | null> => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoading = useRef<boolean>(false);

  useEffect(() => {
    if (!loadMore) return;
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry?.isIntersecting && !isLoading.current) {
          isLoading.current = true;
          try {
            await loadMore();
          } finally {
            isLoading.current = false;
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, rootMargin, threshold, ...dependencies]);

  return sentinelRef;
};

export default useInfiniteScroll;
