import { type ReactNode } from 'react';
import { Card, Text } from '@chakra-ui/react';

import useInfiniteScroll from '@/shared/hooks/use-infinity-scroll';
import { MessageListFallback } from './message-list-fallback';

export const MessageList = ({
  children,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
  emptyMessage = 'The messages list is empty',
}: {
  children: ReactNode[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  emptyMessage?: string;
  fetchNextPage?: () => Promise<unknown>;
}) => {
  const ref = useInfiniteScroll({
    loadMore: hasNextPage ? fetchNextPage : undefined,
    rootMargin: '2000px',
  });

  return (
    <>
      {children.length === 0 && (
        <Card.Root>
          <Card.Body asChild>
            <Text fontSize="xl">{emptyMessage}</Text>
          </Card.Body>
        </Card.Root>
      )}
      {children}
      {isFetchingNextPage && <MessageListFallback />}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};
