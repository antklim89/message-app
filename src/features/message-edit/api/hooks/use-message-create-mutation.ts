import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, messageListQueryOptions } from '@/entities/messages';
import type { MessageCreateType } from '../../model/types';
import { createMessage } from '../repository/create-message';

export function useMessageCreateMutation({ answerToId }: { answerToId?: MessageType['answerToId'] } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: MessageCreateType) {
      const createMessageResult = await createMessage({ ...data, answerToId });
      if (createMessageResult.fail) return createMessageResult;

      queryClient.setQueryData(messageListQueryOptions({ answerToId }).queryKey, oldData =>
        oldData ? { ...oldData, pages: [[createMessageResult.result], ...oldData.pages] } : oldData,
      );

      return createMessageResult;
    },
  });
}
