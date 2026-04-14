import { Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaUsersSlash } from 'react-icons/fa6';

import {
  FollowersList,
  FollowersListFallback,
  FollowersListItem,
  getFollowersQueryOptions,
} from '@/entities/followers';
import { FollowToggleButton } from '@/features/follow-toggle';
import { AwaitComponent } from '@/shared/ui/await-component';
import { Empty } from '@/shared/ui/empty';

export function FollowersPage() {
  const followersQuery = useQuery(getFollowersQueryOptions());

  return (
    <AwaitComponent fallback={<FollowersListFallback />} promise={followersQuery.promise}>
      {followers => (
        <FollowersList>
          <Heading fontSize="4xl" textAlign="center" mb={8}>
            Followers
          </Heading>
          {followers.length === 0 && (
            <Empty title="Followers list is empty" message="No one is following you yet" icon={<FaUsersSlash />} />
          )}
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
