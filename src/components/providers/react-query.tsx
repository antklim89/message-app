import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from '@tanstack/react-router';

const queryClient = new QueryClient();

export default function ReactQuery({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
