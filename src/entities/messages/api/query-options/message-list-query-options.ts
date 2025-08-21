import { type InferDataFromTag, infiniteQueryOptions } from '@tanstack/react-query';

import { messageQueryOptions } from './message-query-options';
import { MESSAGES_PER_PAGE } from '../../config/constants';
import { type MessageType } from '../../models/types';
import { getMessageList } from '../repository/get-message-list';

export const MessageListQueryOptionsBaseKey = 'MESSAGES';
export type MessageListQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof messageListQueryOptions>['queryFn'],
  ReturnType<typeof messageListQueryOptions>['queryKey']
>;

export function messageListQueryOptions({ answerId }: { answerId?: number } = {}) {
  return infiniteQueryOptions({
    getNextPageParam(data: MessageType[]) {
      if (data.length < MESSAGES_PER_PAGE) return;
      return data.at(-1)?.id ?? undefined;
    },
    initialPageParam: undefined as number | undefined,
    async queryFn({ client, pageParam: lastId }) {
      const { fail, error, result } = await getMessageList({ answerId, lastId });
      if (fail) throw new Error(error.message);

      result.items.flat().forEach(message => {
        client.setQueryData(messageQueryOptions({ id: message.id }).queryKey, message);
      });

      return result.items;
    },
    queryKey: [MessageListQueryOptionsBaseKey, { answerId }],
    select(data) {
      return data.pages.flat();
    },
  });
}
