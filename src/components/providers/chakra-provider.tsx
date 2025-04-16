import { ChakraProvider as OriginalChakraProvider } from '@chakra-ui/react';

import { system } from '@/theme';
import type { ColorModeProviderProps } from '../ui/color-mode';
import { ColorModeProvider } from '../ui/color-mode';

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <OriginalChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </OriginalChakraProvider>
  );
}
