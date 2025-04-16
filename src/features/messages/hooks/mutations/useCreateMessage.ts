import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import type { ListResult } from 'pocketbase';

import type { MessageEditSchema } from '../../schemas';
import { createMessage } from '../../services';
import type { MessageType } from '../../types';

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });

  return useMutation({
    async mutationFn(data: MessageEditSchema) {
      const createMessageResult = await createMessage({
        ...data,
        answerTo: params?.messageId,
      });
      if (createMessageResult.type === 'error') return createMessageResult;

      queryClient.setQueriesData<ListResult<MessageType>>({ queryKey: ['MESSAGES'] }, oldData => {
        return oldData
          ? {
              ...oldData,
              items: [createMessageResult.result, ...oldData.items],
            }
          : oldData;
      });

      return createMessageResult;
    },
  });
}
