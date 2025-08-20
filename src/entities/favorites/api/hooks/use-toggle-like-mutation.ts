import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ErrType, type ErrVariant } from '@/share/lib/result';
import { toaster } from '@/share/ui/toaster';
import { type MessageType, updateMessageQueryData } from '../../@x/entities/messages';
import { addFavorite } from '../repository/add-favorite';
import { removeLike } from '../repository/remove-favorite';

const TOAST_ID = 'TOGGLE_FAVORITES';

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
      updateMessageQueryData({ queryClient, messageId }, ({ isFavorite }) => ({
        isFavorite: !isFavorite,
      }));
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
