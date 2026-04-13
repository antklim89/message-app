import { useDialog } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { getProfileQueryOptions, Profile, ProfileFallback } from '@/entities/profiles';
import { LogoutDialog } from '@/features/auth';
import { FollowToggleButton } from '@/features/follow-toggle';
import { AwaitComponent } from '@/shared/ui/await-component';
import { Dialog } from '@/shared/ui/dialog';

export function ProfilePage({ params }: { params: { profileId: string } }) {
  const logoutDialog = useDialog();
  const profileQuery = useQuery(getProfileQueryOptions({ profileId: params.profileId }));

  return (
    <AwaitComponent promise={profileQuery.promise} fallback={<ProfileFallback />}>
      {profile => (
        <Profile
          profile={profile}
          titleSlot={<FollowToggleButton followerId={profile.id} isFollowing={profile.isFollowing} />}
          footerSlot={
            <>
              <LogoutDialog dialog={logoutDialog} />
              <Dialog.Trigger dialog={logoutDialog} colorPalette="red">
                Logout
              </Dialog.Trigger>
            </>
          }
        />
      )}
    </AwaitComponent>
  );
}
