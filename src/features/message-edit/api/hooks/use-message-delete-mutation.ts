import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MessageType } from '@/entities/messages';
import {
  MessageListQueryOptionsBaseKey,
  type MessageListQueryOptionsReturnType,
} from '@/entities/messages/api/query-options/message-list-query-options';
import { toaster } from '@/share/ui/toaster';
import { deleteMessage } from '../repository/delete-message';

export function useMessageDeleteMutation({ id }: { id: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      const deleteMessageResult = await deleteMessage(id);

      if (deleteMessageResult.fail) {
        toaster.error({ title: 'Message delete error.', description: deleteMessageResult.error.message });
        return deleteMessageResult;
      }
      if (deleteMessageResult.success) {
        toaster.success({ title: 'Message delete success.', description: 'Message deleted Successfully!' });
        return deleteMessageResult;
      }

      queryClient.setQueriesData<MessageListQueryOptionsReturnType>(
        { predicate: ({ queryKey }) => MessageListQueryOptionsBaseKey === queryKey[0] },
        oldData =>
          oldData ? { ...oldData, pages: oldData.pages.map(messages => messages.filter(i => i.id !== id)) } : oldData,
      );

      return deleteMessageResult;
    },
  });
}
