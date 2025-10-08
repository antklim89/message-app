import type { QueryClient } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';

export function preloadProfilePage({
  context: { queryClient },
  params: { profileId },
}: {
  context: { queryClient: QueryClient };
  params: { profileId: string };
}) {
  queryClient.ensureQueryData(getProfileQueryOptions({ profileId }));
}
