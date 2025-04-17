import { type QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import type { MessageEditSchema } from '../../schemas';
import { createMessage } from '../../services';
import type { FetchManyMessagesQuery, FetchOneMessagesQuery } from '../../types';

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });
  const answerTo = params?.messageId;

  return useMutation({
    async mutationFn(data: MessageEditSchema) {
      const createMessageResult = await createMessage({
        ...data,
        answerTo,
      });
      if (createMessageResult.type === 'error') return createMessageResult;

      queryClient.setQueriesData<
        FetchManyMessagesQuery['return'],
        QueryFilters<
          FetchManyMessagesQuery['return'],
          FetchManyMessagesQuery['error'],
          FetchManyMessagesQuery['data'],
          FetchManyMessagesQuery['key']
        >
      >({ queryKey: ['MESSAGES', { answerTo }] }, oldData => {
        return oldData ? { ...oldData, items: [createMessageResult.result, ...oldData.items] } : oldData;
      });

      queryClient.setQueryData<FetchOneMessagesQuery['return'], FetchOneMessagesQuery['key']>(
        ['MESSAGE', createMessageResult.result.id],
        createMessageResult.result,
      );

      return createMessageResult;
    },
  });
}
