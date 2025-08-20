import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MessageType } from '@/entities/messages';
import { MessageListQueryOptionsBaseKey } from '@/entities/messages/api/query-options/message-list-query-options';
import { toaster } from '@/share/ui/toaster';
import type { MessageEditType } from '../../model/types';
import { createMessage } from '../repository/create-message';

export function useMessageCreateMutation({ answerId }: { answerId?: MessageType['answerId'] } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(input: MessageEditType) {
      const createMessageResult = await createMessage(answerId, input);
      return createMessageResult;
    },
    onSuccess({ fail, success, error }) {
      queryClient.invalidateQueries({ queryKey: [MessageListQueryOptionsBaseKey] });

      if (fail) toaster.error({ description: error.message });
      if (success) toaster.success({ description: 'Message created successfully!' });
    },
  });
}
