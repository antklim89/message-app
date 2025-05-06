import { useSuspenseQuery } from '@tanstack/react-query';

import { getUser } from '../services';
import type { UserType } from '../types';

export function useUser() {
  const { data } = useSuspenseQuery<UserType | null>({
    queryKey: ['user'],
    queryFn() {
      return getUser();
    },
  });

  return data;
}
