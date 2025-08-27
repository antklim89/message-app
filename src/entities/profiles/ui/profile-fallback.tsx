import { Avatar, Box, Card, HStack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export function ProfileFallback() {
  return (
    <Card.Root border="none" w="full">
      <Card.Header>
        <HStack>
          <SkeletonCircle asChild>
            <Avatar.Root size="2xl" />
          </SkeletonCircle>
          <Card.Title asChild>
            <SkeletonText noOfLines={1} height={6} width={100} />
          </Card.Title>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Description asChild>
          <SkeletonText noOfLines={1} height={4} width={80} />
        </Card.Description>
        <Box my={8}>
          <SkeletonText noOfLines={8} />
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
