import { ChakraProvider as OriginalChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@teispace/next-themes/client';

import type { ColorModeProviderProps } from '../../model/colors';
import { system } from '../../styles/theme';

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <OriginalChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
    </OriginalChakraProvider>
  );
}
