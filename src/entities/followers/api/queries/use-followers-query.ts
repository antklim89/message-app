import { type InferDataFromTag, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getFollowers } from '../repository/get-followers';

export const FollowersQueryOptionsBaseKey = 'FOLLOWERS';
export type FollowersQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof getFollowersQueryOptions>['queryFn'],
  ReturnType<typeof getFollowersQueryOptions>['queryKey']
>;

export function getFollowersQueryOptions({ userId }: { userId: string }) {
  return queryOptions({
    queryKey: [FollowersQueryOptionsBaseKey, { userId }],
    async queryFn() {
      const { fail, error, result } = await getFollowers({ userId });
      if (fail) throw new Error(error.message);
      return result;
    },
  });
}

export function useFollowersQuery(...args: Parameters<typeof getFollowersQueryOptions>) {
  return useSuspenseQuery(getFollowersQueryOptions(...args));
}
