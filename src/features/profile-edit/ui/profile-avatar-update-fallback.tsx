import { Button, Card, Skeleton } from '@chakra-ui/react';

export function ProfileAvatarUpdateFallback() {
  return (
    <Card.Root>
      <Card.Body>
        <Skeleton w="full" h={190} />
      </Card.Body>
      <Card.Footer justifyContent="end">
        <Skeleton asChild>
          <Button>Cancel</Button>
        </Skeleton>
        <Skeleton asChild>
          <Button>Delete</Button>
        </Skeleton>
        <Skeleton asChild>
          <Button>Save</Button>
        </Skeleton>
      </Card.Footer>
    </Card.Root>
  );
}
