import { Avatar, Card, Link as ChakraLink, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { FromNowDate } from '@/shared/ui/from-now-date';
import { type ProfileType } from '../models/types';

export function ProfilePreview({ profile }: { profile: ProfileType }) {
  return (
    <Card.Root border="none" w="full">
      <Card.Header>
        <HStack>
          <Avatar.Root>
            <Avatar.Image src={profile.avatar || undefined} />
            <Avatar.Fallback />
          </Avatar.Root>
          <Card.Title asChild>
            <Heading fontSize="xl">{profile.username}</Heading>
          </Card.Title>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Description fontSize="sm">
          Created: <FromNowDate fontSize="sm" date={profile.created} />
        </Card.Description>
        <Text lineClamp={3}>{profile.bio}</Text>
        <Flex justifyContent="end">
          <ChakraLink asChild>
            <Link to="/profile">More</Link>
          </ChakraLink>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
