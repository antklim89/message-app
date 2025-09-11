import { Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import {
  FollowersList,
  FollowersListFallback,
  FollowersListItem,
  getFollowingsQueryOptions,
} from '@/entities/followers';
import { FollowToggleButton } from '@/features/follow-toggle';
import { AwaitQuery } from '@/shared/ui/await-query';

export function FollowingsPage() {
  const followingsQuery = useQuery(getFollowingsQueryOptions());

  return (
    <AwaitQuery fallback={<FollowersListFallback />} query={followingsQuery}>
      {followings => (
        <FollowersList>
          <Heading fontSize="4xl" textAlign="center" mb={8}>
            Followings
          </Heading>
          {followings.map(following => (
            <FollowersListItem
              key={following.id}
              follower={following}
              actions={<FollowToggleButton isFollowing followerId={following.id} />}
            />
          ))}
        </FollowersList>
      )}
    </AwaitQuery>
  );
}
