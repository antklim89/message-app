import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FollowersQueryOptionsBaseKey, FollowingsQueryOptionsBaseKey } from '@/entities/followers';
import { getProfileQueryOptions, type ProfileType } from '@/entities/profiles';
import { ErrType } from '@/shared/lib/result';
import { toaster } from '@/shared/lib/toaster';
import { follow } from '../repository/follow';
import { unfollow } from '../repository/unfollow';

const TOAST_ID = 'TOGGLE_FOLLOWINGS';

export function useFollowToggleMutation({
  followerId,
  isFollowing,
}: {
  followerId: ProfileType['id'];
  isFollowing: boolean;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      const result = isFollowing ? await unfollow({ followerId }) : await follow({ followerId });
      if (result.fail && result.error.type !== ErrType.CONFLICT) return result;
      if (result.fail && result.error.type === ErrType.AUTHENTICATION) {
        toaster.error({ description: result.error.message, id: TOAST_ID });
        return result;
      }
      if (result.fail) {
        toaster.error({ description: result.error.message, id: TOAST_ID });
        return result;
      }

      return result;
    },
    onSuccess() {
      queryClient.setQueryData(
        getProfileQueryOptions({ profileId: followerId }).queryKey,
        oldData => oldData && { ...oldData, isFollowing: !isFollowing },
      );
      queryClient.invalidateQueries({ queryKey: [FollowersQueryOptionsBaseKey] });
      queryClient.invalidateQueries({ queryKey: [FollowingsQueryOptionsBaseKey] });
    },
  });
}
