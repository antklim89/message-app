import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  RouterProvider as AsideRouterProvider,
  createRootRoute,
  createRouter,
  HeadContent,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { sessionQueryOptions } from '@/share/hooks/use-session';
import { routeTree } from '@/share/model/route-tree-aside.generated';
import { MainLayout } from '@/widgets/main-layout';
import { queryClient } from '../providers/react-query';

const router2 = createRouter({ context: { queryClient }, routeTree });

function RootComponent() {
  return (
    <>
      <HeadContent />
      <MainLayout rightSide={<AsideRouterProvider router={router2} />}>
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
