import { type InferDataFromTag, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { getFollowings } from '../repository/get-followings';

export const FollowingsQueryOptionsBaseKey = 'FOLLOWING';
export type FollowingsQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof getFollowingsQueryOptions>['queryFn'],
  ReturnType<typeof getFollowingsQueryOptions>['queryKey']
>;

export function getFollowingsQueryOptions({ userId }: { userId: string }) {
  return queryOptions({
    queryKey: [FollowingsQueryOptionsBaseKey, { userId }],
    async queryFn() {
      const { fail, error, result } = await getFollowings({ userId });
      if (fail) throw new Error(error.message);
      return result;
    },
  });
}

export function useFollowingsQuery(...args: Parameters<typeof getFollowingsQueryOptions>) {
  return useSuspenseQuery(getFollowingsQueryOptions(...args));
}
