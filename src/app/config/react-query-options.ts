import type { DefaultOptions } from '@tanstack/react-query';

import { ErrType, isErr } from '@/shared/lib/result';

export const reactQueryOptions: DefaultOptions<Error> = {
  queries: {
    experimental_prefetchInRender: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryDelay: 1000 * 10,
    retry(failureCount, error) {
      if (isErr(error) && error.type === ErrType.UNEXPECTED && failureCount < 3) {
        return failureCount < 3;
      }
      return false;
    },
    staleTime: 1000 * 60 * 5,
  },
};
