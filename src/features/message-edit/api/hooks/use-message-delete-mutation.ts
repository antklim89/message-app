import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MessageListQueryOptionsBaseKey, type MessageType } from '@/entities/messages';
import { toaster } from '@/share/ui/toaster';
import { deleteMessage } from '../repository/delete-message';

export function useMessageDeleteMutation({ id }: { id: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      const deleteMessageResult = await deleteMessage(id);
      return deleteMessageResult;
    },
    onSuccess({ fail, success, error }) {
      queryClient.invalidateQueries({ queryKey: [MessageListQueryOptionsBaseKey] });

      if (fail) toaster.error({ description: error.message });
      if (success) toaster.success({ description: 'Message deleted Successfully!' });
    },
  });
}
