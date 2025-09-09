import { Stack, type StackProps } from '@chakra-ui/react';

import { Search } from '@/features/search';
import { ColorModeButton } from '@/shared/ui/color-mode';

export function RightSide(props: StackProps) {
  return (
    <Stack h="full" {...props}>
      <Search />
      <ColorModeButton variant="solid" mt="auto" alignSelf="flex-end" />
    </Stack>
  );
}
