import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getSupabaseSession } from '../lib/supabase';

export function sessionQueryOptions() {
  return queryOptions({
    queryKey: ['SESSION'],
    async queryFn() {
      const session = await getSupabaseSession();
      return session?.user || null;
    },
  });
}

export function useSession() {
  return useSuspenseQuery(sessionQueryOptions());
}
