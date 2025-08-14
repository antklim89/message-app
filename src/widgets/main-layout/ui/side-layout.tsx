import type { ReactNode } from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';

export function SideLayout({ children, width, w, mb, ...props }: { children: ReactNode } & BoxProps) {
  return (
    <Box width={width} w={w} flexShrink={0}>
      <Box
        py={8}
        w={width}
        asChild
        position="fixed"
        top={0}
        bottom={0}
        mb={mb}
        overflow="auto"
        scrollbarWidth="none"
        flexShrink={0}
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}
