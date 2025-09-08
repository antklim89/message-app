import { Button, ButtonGroup, Card, HStack, Span, Stack, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { LogoutButton } from '@/entities/auth';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { Protected } from '@/shared/ui/protected';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { type ProfileType } from '../models/types';

export function Profile({ profile }: { profile: ProfileType }) {
  return (
    <Card.Root border="none" w="full">
      <Card.Header>
        <HStack gap={4}>
          <UserAvatar
            w={{ base: '12rem', mdDown: '6rem' }}
            h={{ base: '12rem', mdDown: '6rem' }}
            fontSize={{ base: '6rem', mdDown: '3rem' }}
            username={profile.username}
            src={profile.avatar}
          />
          <Stack>
            <Card.Title fontSize={{ base: '4xl', mdDown: '2xl' }}>{profile.username}</Card.Title>
            <Span color="gray.200" fontWeight="normal">
              Created: <FromNowDate fontSize={{ base: 'sm', mdDown: 'xs' }} date={profile.created} />
            </Span>
            <Protected
              authorId={profile.id}
              privateElement={
                <ButtonGroup>
                  <Button rounded="full" size={{ mdDown: 'sm', base: 'md' }} p={{ mdDown: 2, base: 'md' }} asChild>
                    <Link to="/profile-settings">Settings</Link>
                  </Button>
                  <Button rounded="full" size={{ mdDown: 'sm', base: 'md' }} p={{ mdDown: 2, base: 'md' }} asChild>
                    <Link to="/favorite-messages">Favorites</Link>
                  </Button>
                  <LogoutButton>
                    <Button
                      rounded="full"
                      size={{ mdDown: 'sm', base: 'md' }}
                      p={{ mdDown: 2, base: 'md' }}
                      colorPalette="red"
                    >
                      Logout
                    </Button>
                  </LogoutButton>
                </ButtonGroup>
              }
            />
          </Stack>
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
