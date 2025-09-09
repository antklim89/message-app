import { Fragment, type ReactNode } from 'react';
import { Card, HStack, Separator, Stack, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { UserAvatar } from '@/shared/ui/user-avatar';
import { type FollowerProfileType } from '../models/types';

export function FollowersList({ followers, actions }: { followers: FollowerProfileType[]; actions?: ReactNode }) {
  return (
    <Card.Root>
      <Card.Body asChild>
        <Stack>
          {followers.map((follower, index) => (
            <Fragment key={follower.id}>
              <HStack>
                <UserAvatar src={follower.avatar} username={follower.username} />
                <Stack>
                  <Text fontSize="xl">
                    <Link to="/profile/$profileId" params={{ profileId: follower.id }}>
                      {follower.username}
                    </Link>
                  </Text>
                  {actions}
                </Stack>
              </HStack>
              {followers.length - 1 !== index && <Separator />}
            </Fragment>
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
