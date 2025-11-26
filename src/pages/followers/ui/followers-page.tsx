import { Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import {
  FollowersList,
  FollowersListFallback,
  FollowersListItem,
  getFollowersQueryOptions,
} from '@/entities/followers';
import { FollowToggleButton } from '@/features/follow-toggle';
import { AwaitComponent } from '@/shared/ui/await-component';

export function FollowersPage() {
  const followersQuery = useQuery(getFollowersQueryOptions());

  return (
    <AwaitComponent fallback={<FollowersListFallback />} promise={followersQuery.promise}>
      {followers => (
        <FollowersList>
          <Heading fontSize="4xl" textAlign="center" mb={8}>
            Followers
          </Heading>
          {followers.map(follower => (
            <FollowersListItem
              key={follower.id}
              follower={follower}
              actions={<FollowToggleButton isFollowing={follower.isFollowing} followerId={follower.id} />}
            />
          ))}
        </FollowersList>
      )}
    </AwaitComponent>
  );
}
