import type { RefObject } from 'react';
import type { IconButtonProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

import { useColorMode } from '../hooks/use-color-mode-value';

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export function ColorModeButton({
  ref,
  ...props
}: ColorModeButtonProps & { ref?: RefObject<HTMLButtonElement | null> }) {
  return (
    <ClientOnly
      fallback={
        <Skeleton asChild>
          <IconButton aria-label="Toggle color mode" {...props} />
        </Skeleton>
      }
    >
      <ColorModeButtonContent {...props} />
    </ClientOnly>
  );
}

export function ColorModeButtonContent({
  ref,
  ...props
}: ColorModeButtonProps & { ref?: RefObject<HTMLButtonElement | null> }) {
  const { colorMode } = useColorMode();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton aria-label="Toggle color mode" onClick={toggleColorMode} ref={ref} variant="ghost" {...props}>
      {colorMode === 'dark' ? <LuMoon /> : <LuSun />}
    </IconButton>
  );
}
