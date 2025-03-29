import { Box, Container } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Logo } from '@/components/layout/logo';
import { Auth } from '@/features/auth/components/auth';


export const Route = createRootRoute({
  component: RootComponent,
});


function RootComponent() {
  return (
    <>
      <Container display="flex" gap="4">
        <Box flex={2} h="vh">
          <Logo />
          <Box display="flex" gap={2}>
            <Auth type="login" />
            <Auth type="register" />
          </Box>
        </Box>
        <Box
          borderLeft="gray.600"
          borderRight="gray.600"
          borderWidth="1px"
          flex={8}
          h="vh"
          w="100%"
        >
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

