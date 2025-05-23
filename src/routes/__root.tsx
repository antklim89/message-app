import { Box, Container } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Logo } from '@/components/layout/logo';
import { SuspenseErrorBoundary } from '@/components/suspense/suspense-error-boundary';
import { ColorModeButton } from '@/components/ui/color-mode';
import { Auth } from '@/features/auth';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Container display="flex" gap="4">
        <Box flex={2} h="vh" display="flex" flexDirection="column" gap={8}>
          <Logo />
          <SuspenseErrorBoundary>
            <Auth />
          </SuspenseErrorBoundary>

          <ColorModeButton mb={4} alignSelf="flex-start" />
        </Box>
        <Box borderLeft="gray.600" borderRight="gray.600" borderWidth="1px" flex={8} h="vh" w="100%">
          <Outlet />
        </Box>
        <Box flex={2} h="vh">
          ASIDE
        </Box>
      </Container>
      <TanStackRouterDevtools />
    </>
  );
}
