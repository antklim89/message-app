import type { QueryClient } from '@tanstack/react-query';

import { getFollowingsQueryOptions } from '@/entities/followers';

export function preloadFollowingsPage({ context: { queryClient } }: { context: { queryClient: QueryClient } }) {
  queryClient.ensureQueryData(getFollowingsQueryOptions());
}
