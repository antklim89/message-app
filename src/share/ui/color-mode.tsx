import type { RefObject } from 'react';
import { ThemeProvider } from 'next-themes';
import type { IconButtonProps, SpanProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

import { useColorMode } from '../hooks/use-color-mode-value';
import { type ColorModeProviderProps } from '../model/colors';

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
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
        boxSize="8"
        onClick={toggleColorMode}
        ref={ref}
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
