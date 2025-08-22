import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ErrType, isErr } from '@/share/lib/result';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retryDelay: 1000 * 10,
      retry(failureCount, error) {
        if (isErr(error)) {
          return error.type !== ErrType.NOT_FOUND;
        }
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
