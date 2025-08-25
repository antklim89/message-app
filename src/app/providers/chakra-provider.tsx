import { ChakraProvider as OriginalChakraProvider } from '@chakra-ui/react';

import { system } from '@/app/styles/theme';
import { type ColorModeProviderProps } from '@/shared/model/colors';
import { ColorModeProvider } from '@/shared/ui/color-mode';

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <OriginalChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </OriginalChakraProvider>
  );
}
