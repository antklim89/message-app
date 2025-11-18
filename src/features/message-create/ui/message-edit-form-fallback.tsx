import { type BoxProps, Button, Card, HStack, IconButton, Skeleton, SkeletonText } from '@chakra-ui/react';

export const MessageEditFormFallback = (props: BoxProps) => {
  return (
    <Card.Root {...props}>
      <Card.Header justifyContent="center">
        <Card.Title textAlign="center" asChild>
          <SkeletonText noOfLines={1}>Create Message</SkeletonText>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Skeleton w="full" h={100} />
        <HStack mt={2}>
          {Array.from({ length: 3 }).map(() => (
            <Skeleton asChild key={Math.random()}>
              <IconButton />
            </Skeleton>
          ))}
        </HStack>
        <HStack mt={2}>
          {Array.from({ length: 5 }).map(() => (
            <Skeleton asChild key={Math.random()}>
              <IconButton />
            </Skeleton>
          ))}
        </HStack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        <Skeleton>
          <Button>Close</Button>
        </Skeleton>
        <Skeleton>
          <Button>Update</Button>
        </Skeleton>
      </Card.Footer>
    </Card.Root>
  );
};
