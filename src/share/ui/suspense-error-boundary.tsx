import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Alert, Button, Center, Spinner, Stack } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { ErrType, isErr } from '../lib/result';

function DefaultErrorFallback({ error }: FallbackProps) {
  const message =
    error instanceof Error
      ? error.message
      : isErr(error)
        ? error.message
        : 'Failed to load component. Unexpected error.';

  const type = isErr(error) ? error.type : ErrType.UNEXPECTED;

  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title fontSize="xl" mb={2} textTransform="uppercase">
          {type === ErrType.NOT_FOUND && 'Not Found Error'}
          {type === ErrType.UNEXPECTED && 'Unexpected Error'}
          {type === ErrType.AUTHENTICATION && ' Authentication Error'}
        </Alert.Title>
        <Alert.Description whiteSpace="pre">{message}</Alert.Description>
      </Alert.Content>
      <Stack>
        <Button asChild size="xs">
          <Link reloadDocument to="/">
            Reload
          </Link>
        </Button>
      </Stack>
    </Alert.Root>
  );
}

function DefaultSuspenseFallback() {
  return (
    <Center h={24}>
      <Spinner />
    </Center>
  );
}

export function SuspenseErrorBoundary({
  children,
  errorFallback: ErrorFallback,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: (props: Partial<FallbackProps>) => ReactNode;
}) {
  return (
    <ErrorBoundary
      fallbackRender={props => (ErrorFallback ? <ErrorFallback {...props} /> : <DefaultErrorFallback {...props} />)}
    >
      <Suspense fallback={fallback ?? <DefaultSuspenseFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
