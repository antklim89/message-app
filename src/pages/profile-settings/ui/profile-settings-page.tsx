import { useQuery } from '@tanstack/react-query';

import { getProfileQueryOptions } from '@/entities/profiles';
import { AvatarUpdate, AvatarUpdateFallback } from '@/features/avatar-edit';
import { ProfileUpdate, ProfileUpdateFallback } from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';
import { AwaitComponent } from '@/shared/ui/await-component';

export function ProfileSettingsPage() {
  const { user } = useSession();
  if (!user?.id) throw errAuthentication().error;
  const profileQuery = useQuery(getProfileQueryOptions({ profileId: user?.id }));

  return (
    <>
      <AwaitComponent promise={profileQuery.promise} fallback={<ProfileUpdateFallback />}>
        {profile => <AvatarUpdate username={profile.username} avatarUrl={profile.avatar} />}
      </AwaitComponent>
      <AwaitComponent promise={profileQuery.promise} fallback={<AvatarUpdateFallback />}>
        {profile => <ProfileUpdate profileEditValues={profile} />}
      </AwaitComponent>
    </>
  );
}
