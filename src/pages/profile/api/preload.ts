import { type QueryClient } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';

export function preloadProfilePage({ context: { queryClient } }: { context: { queryClient: QueryClient } }) {
  queryClient.ensureQueryData(getProfileQueryOptions());
}
