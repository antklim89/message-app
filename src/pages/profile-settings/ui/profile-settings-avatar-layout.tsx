import { useProfileQuery } from '@/entities/profiles';
import { ProfileAvatarUpdate } from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';

export function ProfileSettingsAvatarLayout() {
  const session = useSession();
  if (!session.data?.id) throw errAuthentication().error;
  const profileQuery = useProfileQuery({ profileId: session.data.id });
  return <ProfileAvatarUpdate username={profileQuery.data.username} avatarUrl={profileQuery.data.avatar} />;
}
