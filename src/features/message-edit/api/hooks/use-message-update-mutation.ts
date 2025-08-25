import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, updateMessageQueryData } from '@/entities/messages';
import { toaster } from '@/shared/lib/toaster';
import type { MessageEditType } from '../../model/types';
import { updateMessage } from '../repository/update-message';

export function useMessageUpdateMutation({ messageId }: { messageId: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: MessageEditType) {
      toaster.loading({ description: 'Messages are updating...', id: 'update' });
      const updateMessageResult = await updateMessage(messageId, data);
      return updateMessageResult;
    },
    onSuccess({ fail, success, error }, variables) {
      updateMessageQueryData({ messageId, queryClient }, () => variables);

      if (fail) toaster.error({ description: error.message, id: 'update' });
      if (success) toaster.success({ description: 'Message updated successfully!', id: 'update' });
    },
  });
}
