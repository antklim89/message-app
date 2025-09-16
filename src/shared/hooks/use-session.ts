import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getSupabaseSession } from '../lib/supabase';
import { type User } from '../model/user';

export function sessionQueryOptions() {
  return queryOptions<User | null>({
    queryFn() {
      return getSupabaseSession();
    },
    queryKey: ['SESSION'],
  });
}

export function useSession() {
  const { data } = useSuspenseQuery(sessionQueryOptions());
  return { user: data };
}
