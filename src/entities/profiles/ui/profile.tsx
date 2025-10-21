import type { ReactElement } from 'react';
import { Card, FormatNumber, SimpleGrid, Span, Stack, Stat, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { FromNowDate } from '@/shared/ui/from-now-date';
import { Protected } from '@/shared/ui/protected';
import { UserAvatar } from '@/shared/ui/user-avatar';
import type { ProfileType } from '../models/types';

export function Profile({ profile, followToggleButton }: { profile: ProfileType; followToggleButton: ReactElement }) {
  return (
    <Card.Root>
      <Card.Header asChild>
        <Stack gap={4} flexDirection={{ base: 'column', md: 'row' }}>
          <UserAvatar w="12rem" h="12rem" fontSize="8rem" username={profile.username} src={profile.avatar} />
          <Stack w="full" gap={8}>
            <Card.Title fontSize="4xl">
              {profile.username} {followToggleButton}
            </Card.Title>
            <Span color="fg/80" fontWeight="normal">
              Created: <FromNowDate fontSize="sm" date={profile.created} />
            </Span>
            <SimpleGrid gap={2} columns={2}>
              <Protected
                authorId={profile.id}
                publicElement={
                  <>
                    <Stat.Root>
                      <Stat.Label>Followers</Stat.Label>
                      <Stat.ValueText>
                        <FormatNumber value={profile.followersCount} style="decimal" />
                      </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root>
                      <Stat.Label>Followings</Stat.Label>
                      <Stat.ValueText>
                        <FormatNumber value={profile.followingsCount} style="decimal" />
                      </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root>
                      <Stat.Label>Messages</Stat.Label>
                      <Stat.ValueText asChild>
                        <Link to="/profile/$profileId/messages" params={{ profileId: profile.id }}>
                          <FormatNumber value={profile.messagesCount} style="decimal" />
                        </Link>
                      </Stat.ValueText>
                    </Stat.Root>
                  </>
                }
                privateElement={
                  <>
                    <Stat.Root>
                      <Stat.Label>Followers</Stat.Label>
                      <Stat.ValueText asChild>
                        <Link to="/followers">
                          <FormatNumber value={profile.followersCount} style="decimal" />
                        </Link>
                      </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root>
                      <Stat.Label>Followings</Stat.Label>
                      <Stat.ValueText asChild>
                        <Link to="/followings">
                          <FormatNumber value={profile.followingsCount} style="decimal" />
                        </Link>
                      </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root>
                      <Stat.Label>Messages</Stat.Label>
                      <Stat.ValueText asChild>
                        <Link to="/profile/$profileId/messages" params={{ profileId: profile.id }}>
                          <FormatNumber value={profile.messagesCount} style="decimal" />
                        </Link>
                      </Stat.ValueText>
                    </Stat.Root>

                    <Stat.Root>
                      <Stat.Label>Favorites</Stat.Label>
                      <Stat.ValueText asChild>
                        <Link to="/favorite-messages">
                          <FormatNumber value={profile.favoritesCount} style="decimal" />
                        </Link>
                      </Stat.ValueText>
                    </Stat.Root>
                  </>
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
    </Card.Root>
  );
}
