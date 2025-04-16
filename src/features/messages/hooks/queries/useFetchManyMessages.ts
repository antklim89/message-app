import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { getManyMessages } from '../../services';

export function useFetchManyMessages() {
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });

  return useSuspenseQuery({
    queryKey: ['MESSAGES', { answerTo: params?.messageId }],
    async queryFn() {
      const { type, error, result } = await getManyMessages({ answerTo: params?.messageId });
      if (type === 'error') throw new Error(error.message);
      return result;
    },
  });
}
