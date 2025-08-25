import { type InferDataFromTag, queryOptions } from '@tanstack/react-query';

import { getProfile } from '../repository/get-profile';

export const MessageQueryOptionsBaseKey = 'PROFILE';
export type MessageQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof getProfileQueryOptions>['queryFn'],
  ReturnType<typeof getProfileQueryOptions>['queryKey']
>;

export function getProfileQueryOptions() {
  return queryOptions({
    queryKey: [MessageQueryOptionsBaseKey],
    async queryFn() {
      const { fail, error, result } = await getProfile();
      if (fail) throw error;
      return result;
    },
  });
}
