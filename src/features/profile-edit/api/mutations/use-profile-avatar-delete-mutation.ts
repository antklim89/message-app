import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';
import { getSupabaseSession } from '@/shared/lib/supabase';
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
    async onSuccess({ fail, success, error }) {
      const user = await getSupabaseSession();
      if (user) {
        queryClient.setQueryData(
          getProfileQueryOptions({ profileId: user.id }).queryKey,
          oldData => oldData && { ...oldData, avatar: null },
        );
      }

      if (fail) toaster.error({ description: error.message, id: TOAST_ID });
      if (success) toaster.success({ description: 'Avatar deleted successfully!', id: TOAST_ID });
    },
  });
}
