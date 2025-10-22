import { Card, useDialog } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';
import { LogoutDialog } from '@/features/auth';
import {
  ProfileAvatarUpdate,
  ProfileAvatarUpdateFallback,
  ProfileUpdate,
  ProfileUpdateFallback,
} from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';
import { AwaitQuery } from '@/shared/ui/await-query';
import { Modal } from '@/shared/ui/modal';

export function ProfileSettingsPage() {
  const logoutDialog = useDialog();
  const { user } = useSession();
  if (!user?.id) throw errAuthentication().error;
  const profileQuery = useQuery(getProfileQueryOptions({ profileId: user?.id }));

  return (
    <>
      <AwaitQuery query={profileQuery} fallback={<ProfileUpdateFallback />}>
        {profile => <ProfileAvatarUpdate username={profile.username} avatarUrl={profile.avatar} />}
      </AwaitQuery>
      <AwaitQuery query={profileQuery} fallback={<ProfileAvatarUpdateFallback />}>
        {profile => <ProfileUpdate profileEditValues={profile} />}
      </AwaitQuery>

      <Card.Root justifyContent="flex-end">
        <Card.Body>
          <LogoutDialog dialog={logoutDialog} />
          <Modal.Trigger dialog={logoutDialog} colorPalette="red">
            Logout
          </Modal.Trigger>
        </Card.Body>
      </Card.Root>
    </>
  );
}
