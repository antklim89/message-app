import { queryOptions } from '@tanstack/react-query';

import { getProfile } from '../api/repository/get-profile';

export function fetchProfileQueryOptions() {
  return queryOptions({
    async queryFn() {
      const { fail, result: profile } = await getProfile();
      if (fail) return null;
      return profile;
    },
    queryKey: ['PROFILE'] as const,
  });
}
