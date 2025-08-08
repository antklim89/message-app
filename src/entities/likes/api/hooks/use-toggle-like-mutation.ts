import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, messageListQueryOptions, messageQueryOptions } from '@/entities/messages';
import { ErrType, type ErrVariant } from '@/share/lib/result';
import { toaster } from '@/share/ui/toaster';
import { addLike } from '../repository/add-like';
import { removeLike } from '../repository/remove-like';

const TOAST_ID = 'TOGGLE_LIKES';

function updateMessage(message: MessageType): MessageType {
  return {
    ...message,
    hasLiked: !message.hasLiked,
    likesCount: message.hasLiked ? message.likesCount - 1 : message.likesCount + 1,
  };
}

export function useToggleLikeMutation({ messageId, hasLiked }: { messageId: MessageType['id']; hasLiked: boolean }) {
  const queryClient = useQueryClient();

  return useMutation<void, ErrVariant>({
    async mutationFn() {
      const { fail, error } = hasLiked ? await removeLike({ messageId }) : await addLike({ messageId });
      if (fail && error.type !== ErrType.CONFLICT) throw error;
    },
    onSuccess() {
      queryClient.setQueriesData<InfiniteData<MessageType[], unknown>>(
        { queryKey: messageListQueryOptions({}).queryKey },
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

      queryClient.setQueryData(messageQueryOptions({ id: messageId }).queryKey, oldData =>
        oldData ? updateMessage(oldData) : oldData,
      );
    },
    onError(error) {
      if (error.type === ErrType.AUTHENTICATION) {
        toaster.error({
          description: 'Login to like message.',
          id: TOAST_ID,
        });
        return;
      } else {
        toaster.error({
          description: error.message,
          id: TOAST_ID,
        });
        return;
      }
    },
  });
}
