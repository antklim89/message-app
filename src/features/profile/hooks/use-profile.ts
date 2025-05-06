import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../services';
import type { ProfileQuery } from '../types';

export function useProfile() {
  const { data } = useQuery<ProfileQuery['return'], Error, ProfileQuery['data'], ProfileQuery['key']>({
    queryKey: ['PROFILE'],
    queryFn() {
      return getProfile();
    },
  });

  return data;
}
