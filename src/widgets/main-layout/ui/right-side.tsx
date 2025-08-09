import { Box, type StackProps, VStack } from '@chakra-ui/react';

import { ColorModeButton } from '@/share/ui/color-mode';

export function RightSide(props: StackProps) {
  return (
    <VStack {...props}>
      <Box flexGrow={1} />
      <ColorModeButton alignSelf="flex-end" />
    </VStack>
  );
}
