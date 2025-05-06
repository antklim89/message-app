import { type QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { createMessage } from '../../services';
import type { MessageCreateType } from '../../types';
import type { FetchManyMessagesQuery, FetchOneMessagesQuery } from '../../types';

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const params = useParams({ from: '/message/$messageId', shouldThrow: false });
  const answerToId = params?.messageId ? Number(params?.messageId) : undefined;

  return useMutation({
    async mutationFn(data: MessageCreateType) {
      const createMessageResult = await createMessage({
        ...data,
        answerToId,
      });
      if (createMessageResult.fail) return createMessageResult;

      queryClient.setQueriesData<
        FetchManyMessagesQuery['data'],
        QueryFilters<
          FetchManyMessagesQuery['data'],
          FetchManyMessagesQuery['error'],
          FetchManyMessagesQuery['data'],
          FetchManyMessagesQuery['key']
        >
      >({ queryKey: ['MESSAGES', { answerTo: answerToId }] }, oldData =>
        oldData
          ? {
              ...oldData,
              pages: [[createMessageResult.result], ...oldData.pages],
            }
          : oldData,
      );

      queryClient.setQueryData<FetchOneMessagesQuery['return'], FetchOneMessagesQuery['key']>(
        ['MESSAGE', createMessageResult.result.id],
        createMessageResult.result,
      );

      return createMessageResult;
    },
  });
}
