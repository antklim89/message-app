import { Alert, Button, HStack, Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { ErrType, type ErrVariant, isErr } from '../lib/result';

export function AwaitQueryError<T>({ isLoading, refetch, error }: UseQueryResult<T, Error | ErrVariant>) {
  const message =
    error instanceof Error
      ? error.message
      : isErr(error)
        ? error.message
        : 'Failed to load component. Unexpected error.';

  const type = isErr(error) ? error.type : ErrType.UNEXPECTED;

  return (
    <Alert.Root status="error">
      <Alert.Content>
        <Alert.Title fontSize="2xl" mb={2} textTransform="uppercase">
          {type === ErrType.NOT_FOUND && 'Not Found '}
          {type === ErrType.UNEXPECTED && 'Unexpected '}
          {type === ErrType.AUTHENTICATION && ' Unauthenticated '}
          ERROR
        </Alert.Title>
        <Alert.Description fontSize="xl" asChild>
          <Text whiteSpace="pre-wrap">{message}</Text>
        </Alert.Description>
        <HStack justifyContent="end">
          <Button loading={isLoading} loadingText="Resetting..." onClick={() => refetch()} size="xs">
            Reset
          </Button>
          <Button asChild size="xs">
            <Link reloadDocument to="/">
              Reload
            </Link>
          </Button>
        </HStack>
      </Alert.Content>
    </Alert.Root>
  );
}
