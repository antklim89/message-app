import { useSuspenseQuery } from '@tanstack/react-query';

import { getOneMessage } from '../../services';
import type { FetchOneMessagesQuery, MessageType } from '../../types';

export function useFetchOneMessage({ id }: { id: MessageType['id'] }) {
  return useSuspenseQuery<
    FetchOneMessagesQuery['return'],
    FetchOneMessagesQuery['error'],
    FetchOneMessagesQuery['data'],
    FetchOneMessagesQuery['key']
  >({
    queryKey: ['MESSAGE', id],
    async queryFn() {
      const { type, error, result } = await getOneMessage(id);
      if (type === 'error') throw new Error(error.message);
      return result;
    },
  });
}
