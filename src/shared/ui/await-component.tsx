import { Suspense, use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@chakra-ui/react';

import { ErrorComponent } from './error-component';

export function AwaitComponent<T>({
  fallback = <Spinner />,
  children,
  promise,
}: {
  fallback?: React.ReactNode;
  children: (result: T) => React.ReactNode;
  promise: Promise<T>;
}) {
  if (promise == null) return children(promise);
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <ErrorComponent error={error instanceof Error ? error : new Error('Unexpected error. Try again later.')} />
      )}
    >
      <Suspense fallback={fallback}>
        <AwaitComponentChild promise={promise}>{children}</AwaitComponentChild>
      </Suspense>
    </ErrorBoundary>
  );
}

function AwaitComponentChild<T>({
  children,
  promise,
}: {
  children: (result: T) => React.ReactNode;
  promise: Promise<T>;
}) {
  const result = use(promise);
  return children(result);
}
