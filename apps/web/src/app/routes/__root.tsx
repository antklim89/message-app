import { Box } from '@chakra-ui/react';
import { Toaster } from '@message-app/ui/components/toaster';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import type { trpc } from '@/shared/lib/trpc';
import { BottomLayout, LeftLayout, MainLayout, RightLayout } from '@/widgets/main-layout';

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'message-app',
      },
      {
        name: 'description',
        content: 'message-app is a web application',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <MainLayout bottomSide={<BottomLayout />} leftSide={<LeftLayout />} rightSide={<RightLayout />}>
        <Outlet />
      </MainLayout>
      <Toaster />
      <Box>
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
      </Box>
    </>
  );
}
