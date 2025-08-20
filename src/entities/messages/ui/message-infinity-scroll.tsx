import useInfiniteScroll from '@/share/hooks/use-infinity-scroll';
import { MessageFallback } from './message-fallback';
import { MESSAGES_PER_PAGE } from '../config/constants';

export function MessageInfinityScroll({
  onScreenEnd,
  isFetchingNext,
  hasNext,
}: {
  onScreenEnd?: () => Promise<unknown>;
  isFetchingNext: boolean;
  hasNext: boolean;
}) {
  const ref = useInfiniteScroll({
    loadMore: hasNext ? onScreenEnd : undefined,
    rootMargin: '100px',
  });

  return (
    <>
      {isFetchingNext &&
        Array.from({ length: MESSAGES_PER_PAGE }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is just fallback
          <MessageFallback key={i} />
        ))}
      <div ref={ref} />
    </>
  );
}
