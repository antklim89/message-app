import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from '@tanstack/react-router';

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
