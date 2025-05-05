import { useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { MESSAGES_PER_PAGE } from '../../constants';
import { getManyMessages } from '../../services';
import type { FetchManyMessagesQuery, FetchOneMessagesQuery, MessageType } from '../../types';

export function useFetchManyMessages() {
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });
  const messageId = params?.messageId ? Number(params?.messageId) : undefined;

  const queryClient = useQueryClient();

  return useSuspenseInfiniteQuery<
    FetchManyMessagesQuery['return'],
    FetchManyMessagesQuery['error'],
    FetchManyMessagesQuery['data'],
    FetchManyMessagesQuery['key'],
    MessageType['id'] | undefined
  >({
    queryKey: ['MESSAGES', { answerTo: messageId }],
    async queryFn({ pageParam: lastId }) {
      const { type, error, result } = await getManyMessages({ answerTo: messageId, lastId });
      if (type === 'error') throw new Error(error.message);

      for (const message of result.items) {
        queryClient.setQueryData<FetchOneMessagesQuery['return'], FetchOneMessagesQuery['key']>(
          ['MESSAGE', message.id],
          message,
        );
      }
      return result.items;
    },
    getNextPageParam(data) {
      if (data.length < MESSAGES_PER_PAGE) return undefined;
      return data.at(-1)?.id;
    },
    initialPageParam: undefined,
  });
}
