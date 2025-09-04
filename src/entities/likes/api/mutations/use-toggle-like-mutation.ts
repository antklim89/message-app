import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ErrType } from '@/shared/lib/result';
import { toaster } from '@/shared/lib/toaster';
import { type MessageType, updateMessageQueryData } from '../../@x/entities/messages';
import { addLike } from '../repository/add-like';
import { removeLike } from '../repository/remove-like';

const TOAST_ID = 'TOGGLE_LIKES';

export function useToggleLikeMutation({ messageId, hasLiked }: { messageId: MessageType['id']; hasLiked: boolean }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
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
    onSuccess() {
      updateMessageQueryData({ messageId, queryClient }, prevMessage => ({
        hasLiked: !prevMessage.hasLiked,
        likesCount: prevMessage.hasLiked ? prevMessage.likesCount - 1 : prevMessage.likesCount + 1,
      }));
    },
  });
}
