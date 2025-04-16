import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Alert, Center, Spinner } from '@chakra-ui/react';

export function SuspenseErrorBoundary({
  children,
  errorFallback,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: (props: FallbackProps) => ReactNode;
}) {
  return (
    <ErrorBoundary fallbackRender={props => errorFallback?.(props) ?? <DefaultErrorFallback />}>
      <Suspense fallback={fallback ?? <DefaultSuspenseFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

function DefaultErrorFallback() {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description>Failed to load component.</Alert.Description>
      </Alert.Content>
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
