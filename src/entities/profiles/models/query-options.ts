import { queryOptions } from '@tanstack/react-query';

import { getProfile } from '../api/repository/get-profile';

export function fetchProfileQueryOptions() {
  return queryOptions({
    queryKey: ['PROFILE'] as const,
    async queryFn() {
      const { fail, result: profile } = await getProfile();
      if (fail) return null;
      return profile;
    },
  });
}
