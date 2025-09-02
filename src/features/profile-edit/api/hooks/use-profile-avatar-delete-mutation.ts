import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';
import { toaster } from '@/shared/lib/toaster';
import { deleteAvatar } from '../repository/delete-profile-avatar';

const TOAST_ID = 'AVATAR_DELETE';

export function useProfileAvatarDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      toaster.loading({ description: 'Avatar is updating...', id: TOAST_ID });
      const deleteAvatarResult = await deleteAvatar();
      return deleteAvatarResult;
    },
    onSuccess({ fail, success, error }) {
      queryClient.setQueryData(getProfileQueryOptions().queryKey, oldData => oldData && { ...oldData, avatar: null });

      if (fail) toaster.error({ description: error.message, id: TOAST_ID });
      if (success) toaster.success({ description: 'Avatar deleted successfully!', id: TOAST_ID });
    },
  });
}
