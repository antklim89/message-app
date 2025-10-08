import type { QueryClient } from '@tanstack/react-query';

import { messageListQueryOptions } from '@/entities/messages';

export function preloadHomePage({ context: { queryClient } }: { context: { queryClient: QueryClient } }) {
  queryClient.ensureInfiniteQueryData(messageListQueryOptions());
}
