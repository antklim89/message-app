import { type InferDataFromTag, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getProfile } from '../repository/get-profile';

export const ProfileQueryOptionsBaseKey = 'PROFILE';
export type ProfileQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof getProfileQueryOptions>['queryFn'],
  ReturnType<typeof getProfileQueryOptions>['queryKey']
>;

export function getProfileQueryOptions({ profileId }: { profileId?: string } = {}) {
  return queryOptions({
    queryKey: [ProfileQueryOptionsBaseKey, { profileId }],
    async queryFn() {
      const { fail, error, result } = await getProfile({ profileId });
      if (fail) throw error;
      return result;
    },
  });
}

export function useProfileQuery(...args: Parameters<typeof getProfileQueryOptions>) {
  return useSuspenseQuery(getProfileQueryOptions(...args));
}
