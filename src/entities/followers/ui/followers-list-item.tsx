import { type ReactNode } from 'react';
import { Box, HStack, Separator, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { UserAvatar } from '@/shared/ui/user-avatar';
import { type FollowerProfileType } from '../models/types';

export function FollowersListItem({ follower, actions }: { follower: FollowerProfileType; actions?: ReactNode }) {
  return (
    <>
      <HStack>
        <UserAvatar src={follower.avatar} username={follower.username} />
        <Text fontSize="xl">
          <Link to="/profile/$profileId" params={{ profileId: follower.id }}>
            {follower.username}
          </Link>
        </Text>
        <Box flexGrow={1} />
        {actions}
      </HStack>
      <Separator _last={{ display: 'none' }} />
    </>
  );
}
