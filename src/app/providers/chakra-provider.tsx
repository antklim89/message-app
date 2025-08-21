import { ChakraProvider as OriginalChakraProvider } from '@chakra-ui/react';

import { system } from '@/app/styles/theme';
import { type ColorModeProviderProps } from '@/share/model/colors';
import { ColorModeProvider } from '@/share/ui/color-mode';

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <OriginalChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </OriginalChakraProvider>
  );
}
