import { useSuspenseQuery } from '@tanstack/react-query';

import { getProfileQueryOptions } from '../query-options/get-profile-query-options';

export function useProfileQuery(...args: Parameters<typeof getProfileQueryOptions>) {
  return useSuspenseQuery(getProfileQueryOptions(...args));
}
