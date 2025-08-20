import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, updateMessageQueryData } from '@/entities/messages';
import { toaster } from '@/share/ui/toaster';
import type { MessageEditType } from '../../model/types';
import { updateMessage } from '../repository/update-message';

export function useMessageUpdateMutation({ messageId }: { messageId: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: MessageEditType) {
      toaster.loading({ id: 'update', description: 'Messages are updating...' });
      const updateMessageResult = await updateMessage(messageId, data);
      return updateMessageResult;
    },
    onSuccess({ fail, success, error }, variables) {
      updateMessageQueryData({ queryClient, messageId }, () => variables);

      if (fail) toaster.error({ id: 'update', description: error.message });
      if (success) toaster.success({ id: 'update', description: 'Message updated successfully!' });
    },
  });
}
