import { Avatar, Card, Heading, Stack, Text } from '@chakra-ui/react';

import { FromNowDate } from '@/shared/ui/from-now-date';
import { type ProfileType } from '../models/types';

export function Profile({ profile }: { profile: ProfileType }) {
  return (
    <Card.Root border="none" w="full">
      <Card.Header>
        <Stack>
          <Avatar.Root>
            <Avatar.Image src={profile.avatar || undefined} />
            <Avatar.Fallback />
          </Avatar.Root>
          <Card.Title asChild>
            <Heading fontSize="xl">{profile.username}</Heading>
          </Card.Title>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Card.Description fontSize="sm">
          Created: <FromNowDate fontSize="sm" date={profile.created} />
        </Card.Description>
        <Text truncate>{profile.bio}</Text>
      </Card.Body>
    </Card.Root>
  );
}
