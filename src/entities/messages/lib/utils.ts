import type { ReactNode } from 'react';
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

export function wrapMessageHashTags(text: string, wrapper: (word: string, key: number) => ReactNode): ReactNode {
  return text.split(' ').reduce((acc, word, idx) => {
    if (word.startsWith('#')) {
      acc.push(wrapper(word, idx), ' ');
    } else {
      const last = acc[acc.length - 1];
      if (typeof last === 'string') acc[acc.length - 1] = `${last}${word} `;
      else acc.push(`${word} `);
    }

    return acc;
  }, [] as ReactNode[]);
}
