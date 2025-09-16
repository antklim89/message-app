import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';
import { getSupabaseSession } from '@/shared/lib/supabase';
import { toaster } from '@/shared/lib/toaster';
import type { ProfileEditType } from '../../model/types';
import { updateProfile } from '../repository/update-profile';

const TOAST_ID = 'PROFILE_UPDATE';

export function useProfileUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: ProfileEditType) {
      toaster.loading({ description: 'Profiles are updating...', id: TOAST_ID });
      const updateProfileResult = await updateProfile(data);
      return updateProfileResult;
    },
    async onSuccess({ fail, success, error }, variables) {
      const user = await getSupabaseSession();
      if (user) {
        queryClient.setQueryData(
          getProfileQueryOptions({ profileId: user.id }).queryKey,
          oldData => oldData && { ...oldData, ...variables },
        );
      }
      if (fail) toaster.error({ description: error.message, id: TOAST_ID });
      if (success) toaster.success({ description: 'Profile updated successfully!', id: TOAST_ID });
    },
  });
}
