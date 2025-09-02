import { useProfileQuery } from '@/entities/profiles';
import { ProfileAvatarUpdate } from '@/features/profile-edit';

export function ProfileSettingsAvatarLayout() {
  const profileQuery = useProfileQuery();
  return <ProfileAvatarUpdate username={profileQuery.data.username} avatarUrl={profileQuery.data.avatar} />;
}
