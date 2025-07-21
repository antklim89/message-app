import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/components/ui/toaster';
import {
  type FetchManyMessagesQueryKey,
  type FetchManyMessagesQueryReturn,
  fetchOneMessageQueryOptions,
  type MessageType,
} from '@/features/messages';
import { ErrType, type ErrVariant } from '@/lib/result';
import { addLike, removeLike } from '../../services';

const TOAST_ID = 'TOGGLE_LIKES';

export function useToggleLikes({ messageId, hasLiked }: { messageId: MessageType['id']; hasLiked: boolean }) {
  const queryClient = useQueryClient();

  return useMutation<void, ErrVariant>({
    async mutationFn() {
      const { fail, error } = hasLiked ? await removeLike({ messageId }) : await addLike({ messageId });

      if (fail) {
        if (error.type === ErrType.AUTHENTICATION) {
          toaster.error({
            description: 'Login to add likes.',
            id: TOAST_ID,
          });
        } else {
          toaster.error({
            description: error.message,
            id: TOAST_ID,
          });
        }
      }

      queryClient.setQueriesData<FetchManyMessagesQueryReturn>(
        { predicate: ({ queryKey }) => queryKey[0] === ('MESSAGES' satisfies FetchManyMessagesQueryKey[0]) },
        oldData =>
          oldData
            ? {
                ...oldData,
                pages: oldData.pages.map(page =>
                  page.map(message => (message.id === messageId ? updateMessage(message) : message)),
                ),
              }
            : oldData,
      );

      queryClient.setQueryData(fetchOneMessageQueryOptions({ id: messageId }).queryKey, oldData =>
        oldData ? updateMessage(oldData) : oldData,
      );
    },
  });
}

function updateMessage(message: MessageType): MessageType {
  return {
    ...message,
    hasLiked: !message.hasLiked,
    likesCount: message.hasLiked ? (message.likesCount ?? 0) - 1 : (message.likesCount ?? 0) + 1,
  };
}
