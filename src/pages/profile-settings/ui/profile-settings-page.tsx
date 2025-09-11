import { Button, Card } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { LogoutButton } from '@/entities/auth';
import { getProfileQueryOptions } from '@/entities/profiles';
import {
  ProfileAvatarUpdate,
  ProfileAvatarUpdateFallback,
  ProfileUpdate,
  ProfileUpdateFallback,
} from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';
import { AwaitQuery } from '@/shared/ui/await-query';

export function ProfileSettingsPage() {
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
          <LogoutButton>
            <Button colorPalette="red">Logout</Button>
          </LogoutButton>
        </Card.Body>
      </Card.Root>
    </>
  );
}
