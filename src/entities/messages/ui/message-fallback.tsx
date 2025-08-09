import { Avatar, Card, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export function MessageFallback() {
  return (
    <Card.Root w="full" border="none">
      <Card.Header display="flex" flexDirection="row" alignItems="center" gap={4}>
        <SkeletonCircle>
          <Avatar.Root></Avatar.Root>
        </SkeletonCircle>
        <Card.Title display="flex" flexDirection="column" w="50%">
          <SkeletonText noOfLines={2} />
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <SkeletonText noOfLines={4} />
      </Card.Body>
      <Card.Footer p={0}>
        <Skeleton h={10} w="full" />
      </Card.Footer>
    </Card.Root>
  );
}
