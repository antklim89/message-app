import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getSupabaseSession } from '../lib/supabase';
import { type User } from '../model/user';

export function sessionQueryOptions() {
  return queryOptions<User | null>({
    async queryFn() {
      const session = await getSupabaseSession();
      if (session?.user == null) return null;
      return {
        email: session.user.email,
        id: session.user.id,
      };
    },
    queryKey: ['SESSION'],
  });
}

export function useSession() {
  const { data } = useSuspenseQuery(sessionQueryOptions());
  return { user: data };
}
