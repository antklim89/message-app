import type { QueryClient } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';

export function preloadHashtagPage({ context: { queryClient } }: { context: { queryClient: QueryClient } }) {
  queryClient.ensureInfiniteQueryData(messageListQueryOptions({ isFavorites: true }));
}
