import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { MainLayout } from '@/widgets/main-layout';

function RootComponent() {
  return (
    <>
      <HeadContent />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
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
});
