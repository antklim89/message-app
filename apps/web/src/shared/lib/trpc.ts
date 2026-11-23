import type { AppRouter } from '@message-app/api/routers/index';
import { env } from '@message-app/env/web';
import { QueryClient } from '@tanstack/react-query';
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  isTRPCClientError,
  splitLink,
} from '@trpc/client';
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

const linkOptions = {
  url: `${env.VITE_SERVER_URL}/trpc`,
  fetch(url: URL | RequestInfo, opts?: RequestInit) {
    return fetch(url, { ...opts, credentials: 'include' });
  },
};

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: op => isNonJsonSerializable(op.input),
      true: httpLink({
        ...linkOptions,
        headers(opts) {
          console.log(opts.op.input);
          return {
            'x-filename': 'opts.op.input',
          };
        },
      }),
      false: httpBatchLink(linkOptions),
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
