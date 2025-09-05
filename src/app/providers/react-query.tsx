import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { reactQueryOptions } from '../config/react-query-options';

export const queryClient = new QueryClient({
  defaultOptions: reactQueryOptions,
});

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
