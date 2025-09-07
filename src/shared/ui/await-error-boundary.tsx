import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@chakra-ui/react';
import { type UseQueryResult } from '@tanstack/react-query';
import { Await } from '@tanstack/react-router';

import { QueryErrorComponent } from './query-error-component';

export function AwaitErrorBoundary<T>({
  children,
  fallback = <Spinner />,
  query,
}: {
  fallback?: React.ReactNode;
  children: (result: T) => React.ReactNode;
  query: UseQueryResult<T>;
}) {
  return (
    <ErrorBoundary
      fallback={<QueryErrorComponent isLoading={query.isLoading} refetch={query.refetch} error={query.error} />}
    >
      <Await promise={query.promise} fallback={fallback}>
        {children}
      </Await>
    </ErrorBoundary>
  );
}
