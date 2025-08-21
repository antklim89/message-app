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
      <ReactQueryDevtools buttonPosition="top-left" initialIsOpen={false} position="bottom" />
    </>
  );
}

export const Route = createRootRoute<undefined, { queryClient: QueryClient }>({
  component: RootComponent,
  head() {
    return {
      meta: [{ title: 'Message App' }],
    };
  },
  loader({ context }) {
    context.queryClient.ensureQueryData(sessionQueryOptions());
  },
});
