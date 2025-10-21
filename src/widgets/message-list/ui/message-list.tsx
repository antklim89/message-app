import type { ReactNode } from 'react';
import { Card, EmptyState, VStack } from '@chakra-ui/react';
import { FaCommentSlash } from 'react-icons/fa6';

import { useInfiniteScroll } from '@/shared/hooks/use-infinity-scroll';
import { MessageListFallback } from './message-list-fallback';

export const MessageList = ({
  children,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
  emptyMessage = 'There is no messages.',
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
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <FaCommentSlash />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>The messages list is empty</EmptyState.Title>
                  <EmptyState.Description>{emptyMessage}</EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          </Card.Body>
        </Card.Root>
      )}
      {children}
      {isFetchingNextPage && <MessageListFallback />}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};
