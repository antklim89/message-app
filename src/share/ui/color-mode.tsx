import type { RefObject } from 'react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider, useTheme } from 'next-themes';
import type { IconButtonProps, SpanProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

export type ColorMode = 'light' | 'dark';

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
}

export function ColorModeButton({
  ref,
  ...props
}: ColorModeButtonProps & { ref?: RefObject<HTMLButtonElement | null> }) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        ref={ref}
        boxSize="8"
        variant="ghost"
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
}

export function LightMode({ ref, ...props }: SpanProps & { ref?: RefObject<HTMLSpanElement | null> }) {
  return (
    <Span
      className="chakra-theme light"
      color="fg"
      colorPalette="gray"
      colorScheme="light"
      display="contents"
      ref={ref}
      {...props}
    />
  );
}

export function DarkMode({ ref, ...props }: SpanProps & { ref?: RefObject<HTMLSpanElement | null> }) {
  return (
    <Span
      className="chakra-theme dark"
      color="fg"
      colorPalette="gray"
      colorScheme="dark"
      display="contents"
      ref={ref}
      {...props}
    />
  );
}
