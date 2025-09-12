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

type WrapperType = (word: string, key: number) => ReactNode;
export function wrapMessage({
  text,
  hashtag,
  username,
}: {
  text: string;
  hashtag: WrapperType;
  username: WrapperType;
}): ReactNode {
  return text.split(/(#\w+|@\w+)/gi).map((word, idx) => {
    if (word.startsWith('#')) return hashtag(word, idx);
    if (word.startsWith('@')) return username(word, idx);
    return word;
  });
}
