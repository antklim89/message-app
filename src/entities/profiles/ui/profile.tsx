import { Card, HStack, Span, Stack, Text } from '@chakra-ui/react';

import { FollowToggleButton } from '@/features/follow-toggle';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { type ProfileType } from '../models/types';

export function Profile({ profile }: { profile: ProfileType }) {
  return (
    <Card.Root border="none">
      <Card.Header asChild>
        <HStack gap={4}>
          <UserAvatar
            w={{ base: '12rem', mdDown: '6rem' }}
            h={{ base: '12rem', mdDown: '6rem' }}
            fontSize={{ base: '6rem', mdDown: '3rem' }}
            username={profile.username}
            src={profile.avatar}
          />
          <Stack w="full">
            <Card.Title fontSize={{ base: '4xl', mdDown: '2xl' }}>{profile.username}</Card.Title>
            <Span color="gray.200" fontWeight="normal">
              Created: <FromNowDate fontSize={{ base: 'sm', mdDown: 'xs' }} date={profile.created} />
            </Span>
          </Stack>
          <FollowToggleButton alignSelf="flex-start" followerId={profile.id} isFollowing={profile.isFollowing} />
        </HStack>
      </Card.Header>
      <Card.Body>
        <Text my={8} whiteSpace="pre-wrap">
          {profile.bio}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
