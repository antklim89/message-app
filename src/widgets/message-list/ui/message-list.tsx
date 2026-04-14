import type { ReactNode } from 'react';
import { FaCommentSlash } from 'react-icons/fa6';

import { useInfiniteScroll } from '@/shared/hooks/use-infinity-scroll';
import { Empty } from '@/shared/ui/empty';
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
        <Empty title="The messages list is empty" message={emptyMessage} icon={<FaCommentSlash />} />
      )}
      {children}
      {isFetchingNextPage && <MessageListFallback />}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};
