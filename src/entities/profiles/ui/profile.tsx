import { Badge, Card, HStack, SimpleGrid, Span, Stack, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { FollowToggleButton } from '@/features/follow-toggle';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { Protected } from '@/shared/ui/protected';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { type ProfileType } from '../models/types';

export function Profile({ profile }: { profile: ProfileType }) {
  return (
    <Card.Root border="none">
      <Card.Header asChild>
        <HStack gap={4}>
          <UserAvatar w="12rem" h="12rem" fontSize="8rem" username={profile.username} src={profile.avatar} />
          <Stack w="full">
            <Card.Title fontSize="4xl">{profile.username}</Card.Title>
            <Span color="fg/80" fontWeight="normal">
              Created: <FromNowDate fontSize="sm" date={profile.created} />
            </Span>
            <SimpleGrid gap={2} templateColumns={{ base: '1fr 1fr', mdDown: '1fr' }}>
              <Protected
                authorId={profile.id}
                publicElement={
                  <>
                    <Badge variant="surface" fontSize="lg" p={2}>
                      <Span fontWeight="bold">{profile.followersCount}</Span> Followers
                    </Badge>
                    <Badge variant="surface" fontSize="lg" p={2}>
                      <Span fontWeight="bold">{profile.followingsCount}</Span> Followings
                    </Badge>
                    <Badge cursor="pointer" variant="surface" asChild fontSize="lg" p={2}>
                      <Link to="/profile/$profileId/messages" params={{ profileId: profile.id }}>
                        <Span fontWeight="bold">{profile.messagesCount}</Span> Messages
                      </Link>
                    </Badge>
                  </>
                }
                privateElement={
                  <>
                    <Badge cursor="pointer" variant="surface" asChild fontSize="lg" p={2}>
                      <Link to="/followers">
                        <Span fontWeight="bold">{profile.followersCount}</Span> Followers
                      </Link>
                    </Badge>
                    <Badge cursor="pointer" variant="surface" asChild fontSize="lg" p={2}>
                      <Link to="/followings">
                        <Span fontWeight="bold">{profile.followingsCount}</Span> Followings
                      </Link>
                    </Badge>
                    <Badge cursor="pointer" variant="surface" asChild fontSize="lg" p={2}>
                      <Link to="/profile/$profileId/messages" params={{ profileId: profile.id }}>
                        <Span fontWeight="bold">{profile.messagesCount}</Span> Messages
                      </Link>
                    </Badge>
                    <Badge cursor="pointer" variant="surface" asChild fontSize="lg" p={2}>
                      <Link to="/favorite-messages">
                        <Span fontWeight="bold">{profile.favoritesCount}</Span> Favorites
                      </Link>
                    </Badge>
                  </>
                }
              />
            </SimpleGrid>
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
