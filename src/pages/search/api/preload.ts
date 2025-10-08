import type { QueryClient } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';

export function preloadHashtagPage({
  context: { queryClient },
  params: { hashtag },
}: {
  context: { queryClient: QueryClient };
  params: { hashtag: string };
}) {
  queryClient.ensureInfiniteQueryData(messageListQueryOptions({ search: hashtag }));
}
