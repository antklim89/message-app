import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '@/share/model/route-tree.generated';
import { queryClient } from './providers/react-query';

const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
