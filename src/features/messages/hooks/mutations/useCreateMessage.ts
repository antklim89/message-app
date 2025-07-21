import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { createMessage } from '../../services';
import type { MessageCreateType } from '../../types';
import { fetchManyMessagesQueryOptions } from '../queries/useFetchManyMessages';
import { fetchOneMessageQueryOptions } from '../queries/useFetchOneMessage';

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

      queryClient.setQueryData(fetchManyMessagesQueryOptions(answerToId).queryKey, oldData =>
        oldData ? { ...oldData, pages: [[createMessageResult.result], ...oldData.pages] } : oldData,
      );

      if (answerToId) {
        queryClient.setQueryData(fetchOneMessageQueryOptions({ id: answerToId }).queryKey, createMessageResult.result);
      }

      return createMessageResult;
    },
  });
}
