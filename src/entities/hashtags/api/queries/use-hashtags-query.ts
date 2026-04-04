import { type InferDataFromTag, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import type { HashtagsPeriod } from '../../model/types';
import { getHashtags } from '../repository/get-hashtags';

export const HashtagsQueryOptionsBaseKey = 'HASHTAGS';
export type HashtagsQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof getHashtagsQueryOptions>['queryFn'],
  ReturnType<typeof getHashtagsQueryOptions>['queryKey']
>;

export function getHashtagsQueryOptions({ period }: { period: HashtagsPeriod }) {
  return queryOptions({
    queryKey: [HashtagsQueryOptionsBaseKey, period],
    async queryFn() {
      const { fail, error, result } = await getHashtags({ period });
      if (fail) throw new Error(error.message);
      return result;
    },
  });
}

export function useHashtagsQuery(...args: Parameters<typeof getHashtagsQueryOptions>) {
  return useSuspenseQuery(getHashtagsQueryOptions(...args));
}
