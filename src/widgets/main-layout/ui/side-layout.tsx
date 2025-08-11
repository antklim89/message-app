import type { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export function SideLayout({ children, width }: { children: ReactNode; width: number }) {
  return (
    <Box w={width}>
      <Box py={8} h="vh" w={width} asChild position="fixed" overflow="auto" scrollbarWidth="none">
        {children}
      </Box>
    </Box>
  );
}
