import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, updateMessageQueryData } from '@/entities/messages';
import { useSession } from '@/shared/hooks/use-session';
import { ErrType, errAuthentication } from '@/shared/lib/result';
import { toaster } from '@/shared/lib/toaster';
import { addFavorite } from '../repository/add-favorite';
import { removeFavorite } from '../repository/remove-favorite';

const TOAST_ID = 'TOGGLE_FAVORITES';

export function useToggleFavoriteMutation({
  messageId,
  isFavorite,
}: {
  messageId: MessageType['id'];
  isFavorite: boolean;
}) {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    async mutationFn() {
      if (!user) {
        toaster.error({ description: 'Login to add favorite.', id: TOAST_ID });
        return errAuthentication('Login to add favorite.');
      }
      const result = isFavorite ? await removeFavorite({ messageId }) : await addFavorite({ messageId });
      if (result.fail && result.error.type !== ErrType.CONFLICT) return result;
      if (result.fail && result.error.type === ErrType.AUTHENTICATION) {
        toaster.error({ description: 'Login to add favorite.', id: TOAST_ID });
        return result;
      }
      if (result.fail && result.error.type === ErrType.AUTHENTICATION) {
        toaster.error({ description: result.error.message, id: TOAST_ID });
        return result;
      }

      return result;
    },

    onSuccess(result) {
      if (result.success) {
        updateMessageQueryData({ messageId, queryClient }, prevMessage => ({
          isFavorite: !prevMessage.isFavorite,
        }));
      }
    },
  });
}
