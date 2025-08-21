import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getSupabaseSession } from '../lib/supabase';

export function sessionQueryOptions() {
  return queryOptions({
    async queryFn() {
      const session = await getSupabaseSession();
      return session?.user || null;
    },
    queryKey: ['SESSION'],
  });
}

export function useSession() {
  return useSuspenseQuery(sessionQueryOptions());
}
