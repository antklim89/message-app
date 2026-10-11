import { HStack, type StackProps } from '@chakra-ui/react';

export function Bottom({ children, ...props }: StackProps) {
  return (
    <HStack
      bg="bg"
      borderColor="bg.muted"
      borderTop="sm"
      bottom={0}
      left={0}
      position="fixed"
      right={0}
      {...props}
      asChild
    >
      {children}
    </HStack>
  );
}
