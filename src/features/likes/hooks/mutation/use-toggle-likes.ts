import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { FetchOneMessagesQuery, MessageType } from '@/features/messages';
import { addLike, removeLike } from '../../services';

export function useToggleLikes({ messageId, hasLiked }: { messageId: MessageType['id']; hasLiked: boolean }) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      if (hasLiked) await removeLike({ messageId });
      else await addLike({ messageId });

      queryClient.setQueryData<FetchOneMessagesQuery['return'], FetchOneMessagesQuery['key']>(
        ['MESSAGE', messageId],
        oldData =>
          oldData
            ? {
                ...oldData,
                likes: {
                  ...oldData.likes,
                  count: oldData.likes.hasLiked ? oldData.likes.count - 1 : oldData.likes.count + 1,
                  hasLiked: !oldData.likes.hasLiked,
                },
              }
            : oldData,
      );
    },
  });
}
