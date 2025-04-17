import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { getManyMessages } from '../../services';
import type { FetchManyMessagesQuery, FetchOneMessagesQuery } from '../../types';

export function useFetchManyMessages() {
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });

  const queryClient = useQueryClient();

  return useSuspenseQuery<
    FetchManyMessagesQuery['return'],
    FetchManyMessagesQuery['error'],
    FetchManyMessagesQuery['data'],
    FetchManyMessagesQuery['key']
  >({
    queryKey: ['MESSAGES', { answerTo: params?.messageId }],
    async queryFn() {
      const { type, error, result } = await getManyMessages({ answerTo: params?.messageId });
      if (type === 'error') throw new Error(error.message);

      for (const message of result.items) {
        queryClient.setQueryData<FetchOneMessagesQuery['return'], FetchOneMessagesQuery['key']>(
          ['MESSAGE', message.id],
          message,
        );
      }
      return result;
    },
  });
}
