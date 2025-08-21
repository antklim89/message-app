import type { ReactNode } from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';

export function SideLayout({ children, width, w, mb, ...props }: { children: ReactNode } & BoxProps) {
  return (
    <Box flexShrink={0} w={w} width={width}>
      <Box
        asChild
        bottom={0}
        flexShrink={0}
        mb={mb}
        overflow="auto"
        position="fixed"
        py={8}
        scrollbarWidth="none"
        top={0}
        w={width}
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}
