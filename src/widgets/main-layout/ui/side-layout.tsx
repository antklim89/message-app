import type { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export function SideLayout({ children, width }: { children: ReactNode; width: number }) {
  return (
    <Box h="vh" w={width}>
      <Box h="vh" w={width} asChild position="fixed" overflow="auto" scrollbarWidth="none">
        {children}
      </Box>
    </Box>
  );
}
