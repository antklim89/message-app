import { Flex, Stack, type StackProps } from '@chakra-ui/react';
import { ColorModeButton } from '@message-app/ui/components/color-mode-button';

export function RightLayout(props: StackProps) {
  return (
    <Stack {...props} borderLeft="sm" borderColor="bg.muted">
      <Flex grow="1" />
      <ColorModeButton variant="solid" mt="auto" alignSelf="flex-end" />
    </Stack>
  );
}
