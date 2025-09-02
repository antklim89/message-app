import { type ReactNode } from 'react';

import { MESSAGES_PER_PAGE } from '@/entities/messages';
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
    rootMargin: '100px',
  });
  return (
    <>
      {children}
      {loadingNextFallBack != null &&
        isFetchingNextPage &&
        Array.from({ length: MESSAGES_PER_PAGE }, () => loadingNextFallBack)}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};
