import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMessage } from '../../services';
import type { MessageCreateType, MessageType } from '../../types';

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: MessageCreateType) {
      const createMessageResult = await createMessage(data);
      if (createMessageResult.type === 'error') return createMessageResult;

      queryClient.setQueriesData<MessageType[]>({ queryKey: ['MESSAGES'] }, oldData => {
        return oldData ? [createMessageResult.result, ...oldData] : oldData;
      });

      return createMessageResult;
    },
  });
}
