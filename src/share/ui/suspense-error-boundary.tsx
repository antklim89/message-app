import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Alert, Button, Center, Spinner } from '@chakra-ui/react';

function DefaultErrorFallback({ resetErrorBoundary, error }: Partial<FallbackProps>) {
  const message = error instanceof Error ? error.message : 'Failed to load component. Unexpected error.';

  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description whiteSpace="pre">{message}</Alert.Description>
      </Alert.Content>
      {resetErrorBoundary ? (
        <Button size="xs" onClick={() => resetErrorBoundary()}>
          Restart
        </Button>
      ) : null}
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
    <ErrorBoundary fallbackRender={ErrorFallback ?? DefaultErrorFallback}>
      <Suspense fallback={fallback ?? <DefaultSuspenseFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
