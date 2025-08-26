import { Avatar, Card, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export function MessageCardFallback() {
  return (
    <Card.Root border="none" w="full">
      <Card.Header alignItems="center" display="flex" flexDirection="row" gap={4}>
        <SkeletonCircle>
          <Avatar.Root />
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
