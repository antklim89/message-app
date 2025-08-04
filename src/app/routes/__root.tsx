import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { sessionQueryOptions } from '@/share/hooks/use-session';
import { MainLayout } from '@/widgets/main-layout';

function RootComponent() {
  return (
    <>
      <HeadContent />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools position="top-right" />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" position="bottom" />
    </>
  );
}

export const Route = createRootRoute<undefined, { queryClient: QueryClient }>({
  head() {
    return {
      meta: [{ title: 'Message App' }],
    };
  },
  component: RootComponent,
  loader({ context }) {
    context.queryClient.ensureQueryData(sessionQueryOptions());
  },
});
