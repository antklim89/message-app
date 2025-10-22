import { Card, useDialog } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';
import { LogoutDialog } from '@/features/auth';
import { AvatarUpdate, AvatarUpdateFallback } from '@/features/avatar-edit';
import { ProfileUpdate, ProfileUpdateFallback } from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';
import { AwaitQuery } from '@/shared/ui/await-query';
import { Dialog } from '@/shared/ui/dialog';

export function ProfileSettingsPage() {
  const logoutDialog = useDialog();
  const { user } = useSession();
  if (!user?.id) throw errAuthentication().error;
  const profileQuery = useQuery(getProfileQueryOptions({ profileId: user?.id }));

  return (
    <>
      <AwaitQuery query={profileQuery} fallback={<ProfileUpdateFallback />}>
        {profile => <AvatarUpdate username={profile.username} avatarUrl={profile.avatar} />}
      </AwaitQuery>
      <AwaitQuery query={profileQuery} fallback={<AvatarUpdateFallback />}>
        {profile => <ProfileUpdate profileEditValues={profile} />}
      </AwaitQuery>

      <Card.Root justifyContent="flex-end">
        <Card.Body>
          <LogoutDialog dialog={logoutDialog} />
          <Dialog.Trigger dialog={logoutDialog} colorPalette="red">
            Logout
          </Dialog.Trigger>
        </Card.Body>
      </Card.Root>
    </>
  );
}
