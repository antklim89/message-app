import { Profile, useProfileQuery } from '@/entities/profiles';

export function ProfileLayout({ profileId }: { profileId: string }) {
  const profileQuery = useProfileQuery({ profileId });
  return <Profile profile={profileQuery.data} />;
}
