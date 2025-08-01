import { Box } from '@chakra-ui/react';

import { Auth } from '@/entities/auth';
import { ColorModeButton } from '@/share/ui/color-mode';
import { SuspenseErrorBoundary } from '@/share/ui/suspense-error-boundary';
import { Logo } from './logo';

export function LeftSide() {
  return (
    <Box flex={2} h="vh" display="flex" flexDirection="column" gap={8}>
      <Logo />
      <SuspenseErrorBoundary>
        <Auth />
      </SuspenseErrorBoundary>

      <ColorModeButton mb={4} alignSelf="flex-start" />
    </Box>
  );
}
