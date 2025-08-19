import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MessageType } from '@/entities/messages';
import { MessageListQueryOptionsBaseKey } from '@/entities/messages/api/query-options/message-list-query-options';
import { MessageQueryOptionsBaseKey } from '@/entities/messages/api/query-options/message-query-options';
import { toaster } from '@/share/ui/toaster';
import { deleteMessage } from '../repository/delete-message';

export function useMessageDeleteMutation({ id }: { id: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      const deleteMessageResult = await deleteMessage(id);
      return deleteMessageResult;
    },
    async onSuccess({ fail, success, error }) {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [MessageQueryOptionsBaseKey] }),
        queryClient.invalidateQueries({ queryKey: [MessageListQueryOptionsBaseKey] }),
      ]);

      if (fail) toaster.error({ description: error.message });
      if (success) toaster.success({ description: 'Message deleted Successfully!' });
    },
  });
}
