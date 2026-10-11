import type { AppRouter } from '@message-app/api/routers/index';
import { env } from '@message-app/env/web';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink, isTRPCClientError } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry(failureCount, error) {
        if (isTRPCClientError<AppRouter>(error) && error.data) {
          return error.data.httpStatus >= 500 && failureCount <= 2;
        }
        return false;
      },
    },
  },
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${env.VITE_SERVER_URL}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
