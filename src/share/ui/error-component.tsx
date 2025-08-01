import { Alert, Button } from '@chakra-ui/react';
import { type ErrorComponentProps, Link } from '@tanstack/react-router';

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : 'Failed to load component. Unexpected error.';

  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description whiteSpace="pre">{message}</Alert.Description>
      </Alert.Content>
      <Button size="xs" onClick={() => reset()}>
        Restart
      </Button>
      <Button asChild size="xs">
        <Link to="/">Home</Link>
      </Button>
    </Alert.Root>
  );
}
