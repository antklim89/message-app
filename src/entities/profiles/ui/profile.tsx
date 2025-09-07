import { Box, Button, Card, HStack, Span, Text } from '@chakra-ui/react';
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
        <HStack gap={8}>
          <UserAvatar size={12} username={profile.username} src={profile.avatar} />
          <Box>
            <Card.Title fontSize="4xl">{profile.username}</Card.Title>
            <Span color="gray.200" fontWeight="normal">
              Created: <FromNowDate fontSize="sm" date={profile.created} />
            </Span>
          </Box>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Text my={8} whiteSpace="pre-wrap">
          {profile.bio}
        </Text>
      </Card.Body>
      <Protected
        authorId={profile.id}
        privateElement={
          <Card.Footer justifyContent="flex-end">
            <Button asChild>
              <Link to="/profile-settings">Settings</Link>
            </Button>
            <Button asChild>
              <Link to="/favorite-messages">Favorites</Link>
            </Button>
            <LogoutButton>
              <Button colorPalette="red">Logout</Button>
            </LogoutButton>
          </Card.Footer>
        }
      />
    </Card.Root>
  );
}
