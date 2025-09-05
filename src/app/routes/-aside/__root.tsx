import { Box, VStack } from '@chakra-ui/react';
import { type QueryClient } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { SearchAsidePage } from '@/pages/search';
import { ColorModeButton } from '@/shared/ui/color-mode';

export const Route = createRootRoute<undefined, { queryClient: QueryClient }>({
  component: () => (
    <VStack h="full">
      <SearchAsidePage />
      <Outlet />
      <Box flexGrow={1} />
      <ColorModeButton alignSelf="flex-end" />
    </VStack>
  ),
  notFoundComponent: () => null,
});
