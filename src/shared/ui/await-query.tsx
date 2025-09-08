import { Spinner } from '@chakra-ui/react';
import { type UseQueryResult } from '@tanstack/react-query';

import { AwaitQueryError } from './await-query-error';

export function AwaitQuery<T>({
  children,
  fallback = <Spinner />,
  query,
}: {
  fallback?: React.ReactNode;
  children: (result: T) => React.ReactNode;
  query: UseQueryResult<T>;
}) {
  if (query.isError) return <AwaitQueryError {...query} />;
  if (query.isPending) return fallback;

  return children(query.data);
}
