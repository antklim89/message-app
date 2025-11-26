import { useQuery } from '@tanstack/react-query';

import { getProfileQueryOptions, Profile, ProfileFallback } from '@/entities/profiles';
import { FollowToggleButton } from '@/features/follow-toggle';
import { AwaitComponent } from '@/shared/ui/await-component';

export function ProfilePage({ params }: { params: { profileId: string } }) {
  const profileQuery = useQuery(getProfileQueryOptions({ profileId: params.profileId }));

  return (
    <AwaitComponent promise={profileQuery.promise} fallback={<ProfileFallback />}>
      {profile => (
        <Profile
          profile={profile}
          followToggleButton={
            <FollowToggleButton alignSelf="flex-start" followerId={profile.id} isFollowing={profile.isFollowing} />
          }
        />
      )}
    </AwaitComponent>
  );
}
