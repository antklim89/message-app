import { type ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';

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
      <Stack gap={4}>{children}</Stack>
      {loadingNextFallBack != null && isFetchingNextPage && (
        <Stack gap={4}>{Array.from({ length: MESSAGES_PER_PAGE }, () => loadingNextFallBack)}</Stack>
      )}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};
