import { type InferDataFromTag, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getFollowers } from '../repository/get-followers';

export const FollowersQueryOptionsBaseKey = 'FOLLOWERS';
export type FollowersQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof getFollowersQueryOptions>['queryFn'],
  ReturnType<typeof getFollowersQueryOptions>['queryKey']
>;

export function getFollowersQueryOptions() {
  return queryOptions({
    queryKey: [FollowersQueryOptionsBaseKey],
    async queryFn() {
      const { fail, error, result } = await getFollowers();
      if (fail) throw error;
      return result;
    },
  });
}

export function useFollowersQuery(...args: Parameters<typeof getFollowersQueryOptions>) {
  return useSuspenseQuery(getFollowersQueryOptions(...args));
}
