import { useProfileQuery } from '@/entities/profiles';
import { ProfileAvatarUpdate } from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';

export function ProfileSettingsAvatarLayout() {
  const { user } = useSession();
  if (!user?.id) throw errAuthentication().error;
  const profileQuery = useProfileQuery({ profileId: user.id });
  return <ProfileAvatarUpdate username={profileQuery.data.username} avatarUrl={profileQuery.data.avatar} />;
}
