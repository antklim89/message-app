import { ProfilePreview, useProfileQuery } from '@/entities/profiles';

export function ProfileAsideLayout() {
  const profileQuery = useProfileQuery();

  return <ProfilePreview key={profileQuery.dataUpdatedAt} profile={profileQuery.data} />;
}
