import { Avatar, Card, HStack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export function ProfilePreviewFallback() {
  return (
    <Card.Root border="none" w="full">
      <Card.Header>
        <HStack>
          <Avatar.Root>
            <SkeletonCircle size="10" />
          </Avatar.Root>
          <Card.Title width="full" asChild>
            <SkeletonText noOfLines={1} width="full" />
          </Card.Title>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Description asChild>
          <SkeletonText noOfLines={1} />
        </Card.Description>
        <SkeletonText noOfLines={3} mt={2} />
      </Card.Body>
    </Card.Root>
  );
}
