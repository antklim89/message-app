import { useQuery } from '@tanstack/react-query';

import { FollowersList, FollowersListFallback, getFollowingsQueryOptions } from '@/entities/followers';
import { AwaitQuery } from '@/shared/ui/await-query';

export function FollowingsPage() {
  const followingsQuery = useQuery(getFollowingsQueryOptions());
  return (
    <AwaitQuery fallback={<FollowersListFallback />} query={followingsQuery}>
      {followings => <FollowersList followers={followings} />}
    </AwaitQuery>
  );
}
