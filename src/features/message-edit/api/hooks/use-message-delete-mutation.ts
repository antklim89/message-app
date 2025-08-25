import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MessageListQueryOptionsBaseKey, type MessageType, messageQueryOptions } from '@/entities/messages';
import { toaster } from '@/shared/lib/toaster';
import { deleteMessage } from '../repository/delete-message';

export function useMessageDeleteMutation({ id }: { id: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['MESSAGE', 'UPDATED'],
    async mutationFn() {
      const deleteMessageResult = await deleteMessage(id);
      return deleteMessageResult;
    },
    async onSuccess({ fail, success, error }) {
      queryClient.removeQueries({ queryKey: messageQueryOptions({ id }).queryKey });
      await queryClient.invalidateQueries({ queryKey: [MessageListQueryOptionsBaseKey] });

      if (fail) toaster.error({ description: error.message });
      if (success) toaster.success({ description: 'Message deleted Successfully!' });
    },
  });
}
