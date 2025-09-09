import { useQuery } from '@tanstack/react-query';

import { FollowersList, FollowersListFallback, getFollowersQueryOptions } from '@/entities/followers';
import { AwaitQuery } from '@/shared/ui/await-query';

export function FollowersPage() {
  const followersQuery = useQuery(getFollowersQueryOptions());

  return (
    <AwaitQuery fallback={<FollowersListFallback />} query={followersQuery}>
      {followers => <FollowersList followers={followers} />}
    </AwaitQuery>
  );
}
