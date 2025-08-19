import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MessageType } from '@/entities/messages';
import { MessageListQueryOptionsBaseKey } from '@/entities/messages/api/query-options/message-list-query-options';
import { MessageQueryOptionsBaseKey } from '@/entities/messages/api/query-options/message-query-options';
import { toaster } from '@/share/ui/toaster';
import type { MessageEditType } from '../../model/types';
import { updateMessage } from '../repository/update-message';

export function useMessageUpdateMutation({ messageId }: { messageId: MessageType['id'] }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: MessageEditType) {
      toaster.loading({ id: 'update', description: 'Messages are updating...' });
      await new Promise(res => setTimeout(res, 5000));
      const updateMessageResult = await updateMessage(messageId, data);
      return updateMessageResult;
    },
    async onSuccess({ fail, success, error }) {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [MessageQueryOptionsBaseKey] }),
        queryClient.invalidateQueries({ queryKey: [MessageListQueryOptionsBaseKey] }),
      ]);

      if (fail) toaster.error({ id: 'update', description: error.message });
      if (success) toaster.success({ id: 'update', description: 'Message updated successfully!' });
    },
  });
}
