import { Accordion, Span } from '@chakra-ui/react';
import type { ReactNode } from '@tanstack/react-router';

export function EditMessageAccordion({ children }: { children: ReactNode }) {
  return (
    <Accordion.Root multiple>
      <Accordion.Item value="foo">
        <Accordion.ItemTrigger display="flex" justifyContent="center" cursor="pointer">
          <Span>Create new message</Span>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>{children}</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}
