import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MessageListQueryOptionsBaseKey, type MessageType } from '@/entities/messages';
import { toaster } from '@/shared/lib/toaster';
import type { MessageEditType } from '../../model/types';
import { createMessage } from '../repository/create-message';

export function useMessageCreateMutation({ answerId }: { answerId?: MessageType['answerId'] } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(input: MessageEditType) {
      const createMessageResult = await createMessage(answerId, input);
      return createMessageResult;
    },
    async onSuccess({ fail, success, error }) {
      await queryClient.invalidateQueries({ queryKey: [MessageListQueryOptionsBaseKey] });

      if (fail) toaster.error({ description: error.message });
      if (success) toaster.success({ description: 'Message created successfully!' });
    },
  });
}
