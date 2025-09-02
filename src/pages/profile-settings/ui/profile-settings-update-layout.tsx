import { useProfileQuery } from '@/entities/profiles';
import { ProfileUpdate } from '@/features/profile-edit';

export function ProfileSettingsUpdateLayout() {
  const profileQuery = useProfileQuery();
  return <ProfileUpdate profileEditValues={profileQuery.data} />;
}
