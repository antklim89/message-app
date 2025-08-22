import { Box, VStack } from '@chakra-ui/react';
import { type QueryClient } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { ColorModeButton } from '@/share/ui/color-mode';

export const Route = createRootRoute<undefined, { queryClient: QueryClient }>({
  component: () => (
    <VStack h="full">
      <Outlet />
      <Box flexGrow={1} />
      <ColorModeButton alignSelf="flex-end" />
    </VStack>
  ),
  notFoundComponent: () => null,
});
