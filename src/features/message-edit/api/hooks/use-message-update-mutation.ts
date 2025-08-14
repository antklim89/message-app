import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, messageListQueryOptions, messageQueryOptions } from '@/entities/messages';
import type { MessageEditType } from '../../model/types';
import { updateMessage } from '../repository/update-message';

export function useMessageUpdateMutation({ messageId }: { messageId: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: MessageEditType) {
      const updateMessageResult = await updateMessage(messageId, data);
      if (updateMessageResult.fail) return updateMessageResult;

      queryClient.setQueriesData<InfiniteData<MessageType[], unknown>>(
        { predicate: ({ queryKey }) => messageListQueryOptions({}).queryKey[0] === queryKey[0] },
        oldData =>
          oldData
            ? {
                ...oldData,
                pages: oldData.pages.map(page =>
                  page.map(message => (message.id === messageId ? { ...message, ...data } : message)),
                ),
              }
            : oldData,
      );

      queryClient.setQueryData(messageQueryOptions({ id: messageId }).queryKey, oldData =>
        oldData ? { ...oldData, ...data } : oldData,
      );
      return updateMessageResult;
    },
  });
}
