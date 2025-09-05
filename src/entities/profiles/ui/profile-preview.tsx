import { Box, Button, Card, HStack, Span } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { LogoutButton } from '@/entities/auth';
import { useSession } from '@/shared/hooks/use-session';
import { FromNowDate } from '@/shared/ui/from-now-date';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { type ProfileType } from '../models/types';

export function ProfilePreview({ profile }: { profile: ProfileType }) {
  const session = useSession();
  const isOwner = session?.data?.id === profile.id;
  return (
    <Card.Root border="none" w="full">
      <Card.Header>
        <HStack>
          <UserAvatar username={profile.username} src={profile.avatar} />
          <Box>
            <Card.Title fontSize="xl">{profile.username}</Card.Title>
            <Span fontSize="sm" color="gray.200" fontWeight="normal">
              Created: <FromNowDate fontSize="sm" date={profile.created} />
            </Span>
          </Box>
        </HStack>
      </Card.Header>
      <Card.Body />
      {isOwner && (
        <Card.Footer flexWrap="wrap">
          <Button w="full" asChild>
            <Link to="/profile/settings">Settings</Link>
          </Button>
          <Button w="full" asChild>
            <Link to="/profile/favorite-messages">Favorites</Link>
          </Button>
          <LogoutButton>
            <Button colorPalette="red" w="full">
              Logout
            </Button>
          </LogoutButton>
        </Card.Footer>
      )}
    </Card.Root>
  );
}
