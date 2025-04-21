import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/components/ui/toaster';
import type { FetchOneMessagesQuery, MessageType } from '@/features/messages';
import type { Err } from '@/lib/result';
import { addLike, removeLike } from '../../services';

export function useToggleLikes({ messageId, hasLiked }: { messageId: MessageType['id']; hasLiked: boolean }) {
  const queryClient = useQueryClient();

  return useMutation<void, Err['error']>({
    async mutationFn() {
      const { type, error } = hasLiked ? await removeLike({ messageId }) : await addLike({ messageId });
      if (type === 'error') throw error;

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
    onError(error) {
      if (error.type === 'authentication') {
        toaster.create({
          type: 'error',
          description: 'Login to add likes.',
          id: 'useToggleLikes',
        });
      } else {
        toaster.create({
          type: 'error',
          description: error.message,
          id: 'useToggleLikes',
        });
      }
    },
  });
}
