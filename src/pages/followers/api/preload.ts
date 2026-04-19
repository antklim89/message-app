import type { QueryClient } from '@tanstack/react-query';

import { getFollowersQueryOptions } from '@/entities/followers';

export function preloadFollowersPage({
  context: { queryClient },
  params: { profileId },
}: {
  context: { queryClient: QueryClient };
  params: { profileId: string };
}) {
  queryClient.ensureQueryData(getFollowersQueryOptions({ userId: profileId }));
}
