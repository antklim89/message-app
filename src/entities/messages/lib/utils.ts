import type { ReactNode } from 'react';
import type { QueryClient } from '@tanstack/react-query';

import {
  MessageListQueryOptionsBaseKey,
  type MessageListQueryOptionsReturnType,
} from '../api/queries/use-message-list-query';
import { messageQueryOptions } from '../api/queries/use-message-query';
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

export function wrapMessageHashTags(text: string, wrapper: (word: string, key: number) => ReactNode): ReactNode {
  return text.split(/(#\w+)/gi).map((word, idx) => (word.startsWith('#') ? wrapper(word, idx) : word));
}
