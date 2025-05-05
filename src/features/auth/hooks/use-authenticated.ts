import { useSuspenseQuery } from '@tanstack/react-query';

import { isAuthenticated } from '../services';

export function useAuthenticated() {
  const { data } = useSuspenseQuery<boolean>({
    queryKey: ['user'],
    queryFn() {
      return isAuthenticated();
    },
  });

  return data;
}
