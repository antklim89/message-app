import { useSuspenseQuery } from '@tanstack/react-query';

import { getManyMessages } from '../../services';

export function useFetchManyMessages() {
  return useSuspenseQuery({
    queryKey: ['MESSAGES'],
    async queryFn() {
      const { type, error, result } = await getManyMessages();
      if (type === 'error') throw new Error(error.message);
      return result;
    },
  });
}
