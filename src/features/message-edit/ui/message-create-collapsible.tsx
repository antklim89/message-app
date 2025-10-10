import { lazy, type ReactElement, Suspense } from 'react';
import { Button, Card, Collapsible, HStack, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { MessageEditFormFallback } from './fallbacks/message-edit-form-fallback';
import { useMessageCreateMutation } from '../api/mutations/use-message-create-mutation';
import { useRichTextHandler } from '../lib/hooks/use-rich-text-handler';

const MessageEditForm = lazy(() => import('./forms/message-edit-form').then(m => ({ default: m.MessageEditForm })));

export function MessageCreateCollapsible({
  answerId,
  trigger,
}: {
  answerId: MessageType['answerId'];
  trigger?: ReactElement;
}) {
  const disclosure = useDisclosure();
  const messageCreateMutation = useMessageCreateMutation({ answerId });
  const { ref, handleSubmit } = useRichTextHandler({
    async onSubmit(value) {
      if (!value) return;
      const result = await messageCreateMutation.mutateAsync({ body: value });
      if (result.success) disclosure.onClose();
    },
  });

  return (
    <Collapsible.Root lazyMount open={disclosure.open} unmountOnExit>
      <Collapsible.Trigger
        asChild
        cursor="pointer"
        display="flex"
        justifyContent="center"
        onClick={disclosure.onToggle}
        p={2}
        textTransform="uppercase"
        w="full"
      >
        {trigger ?? <Button variant="outline">Create new message</Button>}
      </Collapsible.Trigger>
      <Collapsible.Content asChild mt={2}>
        <Card.Root>
          <Card.Body>
            <Suspense fallback={<MessageEditFormFallback />}>
              <MessageEditForm ref={ref} />
            </Suspense>
          </Card.Body>
          <Card.Footer asChild>
            <HStack justifyContent="flex-end">
              <Button onClick={disclosure.onClose} variant="ghost">
                Cancel
              </Button>
              <Button loading={messageCreateMutation.isPending} loadingText="Creating..." onClick={handleSubmit}>
                Create
              </Button>
            </HStack>
          </Card.Footer>
        </Card.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
