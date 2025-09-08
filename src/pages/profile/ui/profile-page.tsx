import { useQuery } from '@tanstack/react-query';

import { getProfileQueryOptions, Profile, ProfileFallback } from '@/entities/profiles';
import { AwaitQuery } from '@/shared/ui/await-query';

export function ProfilePage({ params }: { params: { profileId: string } }) {
  const profileQuery = useQuery(getProfileQueryOptions({ profileId: params.profileId }));

  return (
    <AwaitQuery query={profileQuery} fallback={<ProfileFallback />}>
      {profile => <Profile profile={profile} />}
    </AwaitQuery>
  );
}
