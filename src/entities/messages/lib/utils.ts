import type { QueryClient } from '@tanstack/react-query';

import {
  MessageListQueryOptionsBaseKey,
  type MessageListQueryOptionsReturnType,
} from '../api/query-options/message-list-query-options';
import { messageQueryOptions } from '../api/query-options/message-query-options';
import type { MessageType } from '../models/types';

export function updateMessageQueryData(
  {
    queryClient,
    messageId,
  }: {
    queryClient: QueryClient;
    messageId: number;
  },
  updateMessage: (msg: MessageType) => Partial<MessageType>,
) {
  queryClient.setQueryData(
    messageQueryOptions({ id: messageId }).queryKey,
    oldData => oldData && { ...oldData, ...updateMessage(oldData) },
  );

  queryClient.setQueriesData<MessageListQueryOptionsReturnType>(
    { predicate: ({ queryKey }) => queryKey[0] === MessageListQueryOptionsBaseKey },
    oldData =>
      oldData && {
        ...oldData,
        pages: oldData.pages.map(messages =>
          messages.map(message => (message.id === messageId ? { ...message, ...updateMessage(message) } : message)),
        ),
      },
  );
}
