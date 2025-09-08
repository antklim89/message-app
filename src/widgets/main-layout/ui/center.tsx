import { Stack, type StackProps } from '@chakra-ui/react';

export function Center(props: StackProps) {
  return <Stack {...props} flexGrow={1} py={4} />;
}
