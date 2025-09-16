import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { toaster } from '@/shared/lib/toaster';
import { updateAvatar } from '../repository/update-profile-avatar';

const TOAST_ID = 'AVATAR_UPDATE';

export function useProfileAvatarUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(file: File) {
      toaster.loading({ description: 'Avatar is updating...', id: TOAST_ID });
      const updateAvatarResult = await updateAvatar(file);
      return updateAvatarResult;
    },
    async onSuccess({ fail, success, error, result }) {
      const user = await getSupabaseSession();
      if (user) {
        queryClient.setQueryData(
          getProfileQueryOptions({ profileId: user.id }).queryKey,
          oldData => oldData && { ...oldData, avatar: result ?? null },
        );
      }
      if (fail) toaster.error({ description: error.message, id: TOAST_ID });
      if (success) toaster.success({ description: 'Avatar updated successfully!', id: TOAST_ID });
    },
  });
}
