import { type ReactNode } from 'react';

import useInfiniteScroll from '@/shared/hooks/use-infinity-scroll';

export const MessageList = ({
  children,
  loadingNextFallBack,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
}: {
  children: ReactNode;
  loadingNextFallBack?: ReactNode;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => Promise<unknown>;
}) => {
  const ref = useInfiniteScroll({
    loadMore: hasNextPage ? fetchNextPage : undefined,
    rootMargin: '2000px',
  });

  return (
    <>
      {children}
      {loadingNextFallBack != null && isFetchingNextPage && loadingNextFallBack}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};
