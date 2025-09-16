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

const usernameRegex = /\[(.+)\]/i;
const wordRegex = /(#\w+|@\w+\[.+\]+)/gi;
export function wrapMessage({
  text,
  hashtagRender,
  usernameRender,
}: {
  text: string;
  hashtagRender: (word: string, key: number) => ReactNode;
  usernameRender: (word: string, id: string, key: number) => ReactNode;
}): ReactNode {
  return text.split(wordRegex).map((word, idx) => {
    if (word.startsWith('#')) {
      return hashtagRender(word, idx);
    }
    if (word.startsWith('@')) {
      const [username, id] = word.split(usernameRegex);
      if (!(username && id)) return word;
      return usernameRender(username, id, idx);
    }
    return word;
  });
}
