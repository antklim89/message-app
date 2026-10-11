import type { ReactNode } from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';

export function Side({ children, width, w, h, height, mb, ...props }: { children: ReactNode } & BoxProps) {
  return (
    <Box flexShrink={0} w={w} width={width} h={h} minHeight={height}>
      <Box
        py="8"
        bottom={0}
        flexShrink={0}
        mb={mb}
        overflow="auto"
        position="fixed"
        scrollbarWidth="none"
        top={0}
        w={width}
        asChild
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
}
