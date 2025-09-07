import { Alert, Button } from '@chakra-ui/react';
import { type UseQueryResult } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

export function QueryErrorComponent({
  isLoading,
  refetch,
  error,
}: Pick<UseQueryResult, 'isLoading' | 'refetch' | 'error'>) {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description whiteSpace="pre">{error?.message}</Alert.Description>
      </Alert.Content>
      <Button loading={isLoading} loadingText="Resetting..." onClick={() => refetch()} size="xs">
        Reset
      </Button>
      <Button asChild size="xs">
        <Link to="/">Home</Link>
      </Button>
    </Alert.Root>
  );
}
