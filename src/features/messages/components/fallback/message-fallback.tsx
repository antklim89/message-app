import { Card, Separator, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function MessageFallback() {
  return (
    <Card.Root w="full" border="none">
      <Card.Header>
        <Skeleton h={6} w={200} />
        <Skeleton h={4} w={120} />
      </Card.Header>
      <Card.Body>
        <SkeletonText noOfLines={4} />
      </Card.Body>
      <Separator />
    </Card.Root>
  );
}
