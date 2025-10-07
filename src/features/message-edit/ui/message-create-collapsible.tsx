import { lazy, type ReactElement, Suspense } from 'react';
import { Button, Card, Collapsible, HStack, useDisclosure } from '@chakra-ui/react';
import type { SerializedRootNode } from 'lexical';

import type { MessageType } from '@/entities/messages';
import { MessageEditFormFallback } from './message-edit-form-fallback';
import { useMessageCreateMutation } from '../api/mutations/use-message-create-mutation';

const MessageEditForm = lazy(() => import('./message-edit-form').then(m => ({ default: m.MessageEditForm })));

export function MessageCreateCollapsible({
  answerId,
  trigger,
}: {
  answerId: MessageType['answerId'];
  trigger?: ReactElement;
}) {
  const disclosure = useDisclosure();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  async function handleSubmit(value?: SerializedRootNode) {
    if (value == null) return;
    const result = await messageCreateMutation.mutateAsync({ body: value });
    if (result.success) {
      disclosure.onClose();
    }
  }

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
          <Suspense fallback={<MessageEditFormFallback />}>
            <Card.Body asChild>
              <MessageEditForm onSubmit={handleSubmit}>
                <HStack justifyContent="flex-end">
                  <Button onClick={disclosure.onClose} variant="ghost">
                    Cancel
                  </Button>
                  <Button loading={messageCreateMutation.isPending} loadingText="Creating..." type="submit">
                    Create
                  </Button>
                </HStack>
              </MessageEditForm>
            </Card.Body>
          </Suspense>
        </Card.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
