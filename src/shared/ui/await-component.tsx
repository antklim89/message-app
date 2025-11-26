import { Suspense, use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@chakra-ui/react';
import { ErrorComponent } from '@tanstack/react-router';

export function AwaitComponent<T>({
  fallback = <Spinner />,
  ...props
}: {
  fallback?: React.ReactNode;
  children: (result: T) => React.ReactNode;
  promise: Promise<T>;
}) {
  return (
    <ErrorBoundary fallbackRender={ErrorComponent}>
      <Suspense fallback={fallback}>
        <AwaitComponentChildren {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

export function AwaitComponentChildren<T>({
  children,
  promise,
}: {
  children: (result: T) => React.ReactNode;
  promise: Promise<T>;
}) {
  const resolved = promise != null ? use(promise) : promise;
  return children(resolved);
}
