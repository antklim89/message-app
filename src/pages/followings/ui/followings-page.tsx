import { Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaUsersSlash } from 'react-icons/fa6';

import {
  FollowersList,
  FollowersListFallback,
  FollowersListItem,
  getFollowingsQueryOptions,
} from '@/entities/followers';
import { FollowToggleButton } from '@/features/follow-toggle';
import { AwaitComponent } from '@/shared/ui/await-component';
import { Empty } from '@/shared/ui/empty';

export function FollowingsPage({ params }: { params: { profileId: string } }) {
  const followingsQuery = useQuery(getFollowingsQueryOptions({ userId: params.profileId }));

  return (
    <AwaitComponent fallback={<FollowersListFallback />} promise={followingsQuery.promise}>
      {followings => (
        <FollowersList>
          <Heading fontSize="4xl" textAlign="center" mb={8}>
            Followings
          </Heading>
          {followings.length === 0 && (
            <Empty
              title="Followings list is empty"
              message="You are not following anyone yet"
              icon={<FaUsersSlash />}
            />
          )}
          {followings.map(following => (
            <FollowersListItem
              key={following.id}
              follower={following}
              actions={<FollowToggleButton isFollowing followerId={following.id} />}
            />
          ))}
        </FollowersList>
      )}
    </AwaitComponent>
  );
}
