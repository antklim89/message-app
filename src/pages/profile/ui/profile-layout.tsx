import { Profile, useProfileQuery } from '@/entities/profiles';

export function ProfileLayout() {
  const profileQuery = useProfileQuery();
  return <Profile profile={profileQuery.data} />;
}
