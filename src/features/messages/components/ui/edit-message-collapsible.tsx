import { Button, Collapsible, Separator } from '@chakra-ui/react';
import type { ReactNode } from '@tanstack/react-router';

export function EditMessageCollapsible({
  children,
  onToggle,
  open,
}: {
  children: ReactNode;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <Collapsible.Root open={open} unmountOnExit>
      <Collapsible.Trigger
        asChild
        onClick={onToggle}
        textTransform="uppercase"
        p={2}
        w="full"
        display="flex"
        justifyContent="center"
        cursor="pointer"
      >
        <Button variant="outline">Create new message</Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        {children}
        <Separator />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
