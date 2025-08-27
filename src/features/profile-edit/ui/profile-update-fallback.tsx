import { Button, Card, Heading, Input, Skeleton, Stack, Textarea } from '@chakra-ui/react';

export function ProfileUpdateFallback() {
  return (
    <Card.Root>
      <Card.Header asChild>
        <Heading fontSize="2xl" textAlign="center">
          Profile Update
        </Heading>
      </Card.Header>
      <Card.Body>
        <Stack>
          <Skeleton asChild>
            <Input />
          </Skeleton>
          <Skeleton>
            <Textarea rows={10} />
          </Skeleton>
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="end">
        <Skeleton asChild>
          <Button>Cancel</Button>
        </Skeleton>
        <Skeleton asChild>
          <Button>Save</Button>
        </Skeleton>
      </Card.Footer>
    </Card.Root>
  );
}
