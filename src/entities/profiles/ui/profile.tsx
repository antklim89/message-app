import type { ReactNode } from 'react';
import { Card, HStack, SimpleGrid, Span, Stack, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { FromNowDate } from '@/shared/ui/from-now-date';
import { Protected } from '@/shared/ui/protected';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { ProfileStat } from './profile-stat';
import type { ProfileType } from '../models/types';

export function Profile({
  profile,
  titleSlot,
  footerSlot,
}: {
  profile: ProfileType;
  titleSlot?: ReactNode;
  footerSlot?: ReactNode;
}) {
  return (
    <Card.Root>
      <Card.Header asChild>
        <Stack gap={2} flexDirection={{ base: 'column', md: 'row' }}>
          <UserAvatar w="12rem" h="12rem" fontSize="8rem" username={profile.username} src={profile.avatar} />
          <Stack w="full" gap={8}>
            <HStack justifyContent="space-between" flexWrap="wrap">
              <Card.Title fontSize="4xl">{profile.username}</Card.Title>
              <div> {titleSlot}</div>
            </HStack>
            <Span color="fg/80" fontWeight="normal">
              Created: <FromNowDate fontSize="sm" date={profile.created} />
            </Span>
            <SimpleGrid gap={2} columns={2}>
              <ProfileStat
                title="Followings"
                params={{ profileId: profile.id }}
                value={profile.followingsCount}
                linkSlot={Link}
                to="/profile/$profileId/followings"
              />
              <ProfileStat
                title="Followers"
                params={{ profileId: profile.id }}
                value={profile.followersCount}
                linkSlot={Link}
                to="/profile/$profileId/followers"
              />
              <ProfileStat
                title="Messages"
                value={profile.messagesCount}
                linkSlot={Link}
                to="/profile/$profileId/messages"
                params={{ profileId: profile.id }}
              />

              <Protected
                authorId={profile.id}
                privateElement={
                  <ProfileStat
                    title="Favorites"
                    value={profile.favoritesCount}
                    linkSlot={Link}
                    to="/favorite-messages"
                  />
                }
              />
            </SimpleGrid>
          </Stack>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Text my={8} whiteSpace="pre-wrap">
          {profile.bio}
        </Text>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">{footerSlot}</Card.Footer>
    </Card.Root>
  );
}
