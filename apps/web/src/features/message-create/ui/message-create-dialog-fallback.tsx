import { Card, Separator, Skeleton } from '@chakra-ui/react';

export function MessageCreateDialogFallback() {
  return (
    <Card.Root>
      <Card.Body p={0}>
        <Skeleton w="full" h="12" opacity={0.8} />
        <Separator />
        <Skeleton w="full" h="48" />
      </Card.Body>
    </Card.Root>
  );
}
