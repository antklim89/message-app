import { createRouter, RouterProvider } from '@tanstack/react-router';
import { z } from 'zod/v4-mini';

import { routeTree } from '@/shared/model/route-tree.generated';
import { queryClient } from './providers/react-query';

const router = createRouter({ context: { queryClient }, routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

z.config({
  customError: ({ code, minimum, maximum, input }) => {
    if (code === 'too_small') {
      if (typeof input === 'string') {
        return `Field should contain ${minimum} or more characters. Now it is ${input.length}.`;
      }
      if (typeof input === 'number') {
        return `Field should be equal ${minimum} or more. Now it is ${input}.`;
      }
    }
    if (code === 'too_big') {
      if (typeof input === 'string') {
        return `Field should contain ${maximum} or less characters. Now it is ${input.length}.`;
      }
      if (typeof input === 'number') {
        return `Field should be equal ${maximum} or less. Now it is ${input}.`;
      }
    }
    if (code === 'invalid_type') {
      if (typeof input === 'undefined' || input === null) return 'Field is required.';
    }
    return;
  },
});

export function App() {
  return <RouterProvider router={router} />;
}
