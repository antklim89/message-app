import { type InferDataFromTag, keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getProfileList } from '../repository/get-profile-list';

export const ProfileListQueryOptionsBaseKey = 'PROFILE_LIST';
export type ProfileListQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof getProfileListQueryOptions>['queryFn'],
  ReturnType<typeof getProfileListQueryOptions>['queryKey']
>;

export function getProfileListQueryOptions({ search }: { search: string }) {
  return queryOptions({
    queryKey: [ProfileListQueryOptionsBaseKey, { search }],
    placeholderData: keepPreviousData,
    async queryFn() {
      const { fail, error, result } = await getProfileList({ search });
      if (fail) throw error;
      return result;
    },
  });
}
