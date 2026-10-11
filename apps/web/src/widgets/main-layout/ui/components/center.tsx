import { Stack, type StackProps } from '@chakra-ui/react';

export function Center({ children, ...props }: StackProps) {
  return (
    <Stack {...props} flexGrow={1} py={4} width="full" position="relative" minHeight="100vh">
      {children}
    </Stack>
  );
}
