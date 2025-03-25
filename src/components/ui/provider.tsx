import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/theme';
import type { ColorModeProviderProps } from './color-mode';
import { ColorModeProvider } from './color-mode';


export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
