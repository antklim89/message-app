import './config/error-messages';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '@/shared/model/route-tree.generated';
import { queryClient } from './providers/react-query';

const router = createRouter({ context: { queryClient }, routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
