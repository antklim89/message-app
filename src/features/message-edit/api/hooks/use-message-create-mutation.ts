import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, messageListQueryOptions } from '@/entities/messages';
import type { MessageEditType } from '../../model/types';
import { createMessage } from '../repository/create-message';

export function useMessageCreateMutation({ answerId }: { answerId?: MessageType['answerId'] } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(input: MessageEditType) {
      const createMessageResult = await createMessage(answerId, input);
      if (createMessageResult.fail) return createMessageResult;

      queryClient.setQueryData(messageListQueryOptions({ answerId }).queryKey, oldData =>
        oldData ? { ...oldData, pages: [[createMessageResult.result], ...oldData.pages] } : oldData,
      );

      return createMessageResult;
    },
  });
}
