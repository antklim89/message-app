import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MessageType, updateMessageQueryData } from '@/entities/messages';
import { useSession } from '@/shared/hooks/use-session';
import { ErrType, errAuthentication } from '@/shared/lib/result';
import { toaster } from '@/shared/lib/toaster';
import { addLike } from '../repository/add-like';
import { removeLike } from '../repository/remove-like';

const TOAST_ID = 'TOGGLE_LIKES';

export function useToggleLikeMutation({ messageId, hasLiked }: { messageId: MessageType['id']; hasLiked: boolean }) {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    async mutationFn() {
      if (!user) {
        toaster.error({ description: 'Login to like message.', id: TOAST_ID });
        return errAuthentication('Login to like message.');
      }
      const result = hasLiked ? await removeLike({ messageId }) : await addLike({ messageId });
      if (result.fail && result.error.type !== ErrType.CONFLICT) return result;
      if (result.fail && result.error.type === ErrType.AUTHENTICATION) {
        toaster.error({ description: 'Login to like message.', id: TOAST_ID });
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
          hasLiked: !prevMessage.hasLiked,
          likesCount: prevMessage.hasLiked ? prevMessage.likesCount - 1 : prevMessage.likesCount + 1,
        }));
      }
    },
  });
}
