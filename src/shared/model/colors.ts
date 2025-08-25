import { type ThemeProviderProps } from 'next-themes';

export interface ColorModeProviderProps extends ThemeProviderProps {}

export type ColorMode = 'light' | 'dark';

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}
