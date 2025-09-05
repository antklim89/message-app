import { Box, Card, HStack, Span, Text } from '@chakra-ui/react';

import { FromNowDate } from '@/shared/ui/from-now-date';
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
    </Card.Root>
  );
}
