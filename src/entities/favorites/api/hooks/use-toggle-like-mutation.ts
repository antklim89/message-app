import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, messageListQueryOptions, messageQueryOptions } from '@/entities/messages';
import { ErrType, type ErrVariant } from '@/share/lib/result';
import { toaster } from '@/share/ui/toaster';
import { addFavorite } from '../repository/add-faviorite';
import { removeLike } from '../repository/remove-favorite';

const TOAST_ID = 'TOGGLE_FAVORITES';

function updateMessage(message: MessageType): MessageType {
  return {
    ...message,
    isFavorite: !message.isFavorite,
  };
}

export function useToggleLikeMutation({
  messageId,
  isFavorite,
}: {
  messageId: MessageType['id'];
  isFavorite: boolean;
}) {
  const queryClient = useQueryClient();

  return useMutation<void, ErrVariant>({
    async mutationFn() {
      const { fail, error } = isFavorite ? await removeLike({ messageId }) : await addFavorite({ messageId });
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
          description: 'Login to add to Favorites.',
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
