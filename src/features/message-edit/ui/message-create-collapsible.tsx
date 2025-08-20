import { type ReactElement, useId } from 'react';
import { Button, Card, Collapsible, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { MessageEditForm } from './message-edit-form';
import { useMessageCreateMutation } from '../api/hooks/use-message-create-mutation';
import type { MessageEditType } from '../model/types';

export function MessageCreateCollapsible({
  answerId,
  trigger,
}: {
  answerId: MessageType['answerId'];
  trigger?: ReactElement;
}) {
  const disclosure = useDisclosure();
  const id = useId();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  async function handleSubmit(data: MessageEditType) {
    const result = await messageCreateMutation.mutateAsync(data);
    if (result.success) disclosure.onClose();
    return result;
  }

  return (
    <Collapsible.Root open={disclosure.open} unmountOnExit>
      <Collapsible.Trigger
        asChild
        onClick={disclosure.onToggle}
        textTransform="uppercase"
        p={2}
        w="full"
        display="flex"
        justifyContent="center"
        cursor="pointer"
      >
        {trigger ?? <Button variant="outline">Create new message</Button>}
      </Collapsible.Trigger>
      <Collapsible.Content asChild mb={4}>
        <Card.Root>
          <Card.Body>
            <MessageEditForm id={id} onSubmit={handleSubmit} />
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="ghost" onClick={disclosure.onClose}>
              Cancel
            </Button>
            <Button form={id} type="submit" loadingText="Creating..." loading={messageCreateMutation.isPending}>
              Create
            </Button>
          </Card.Footer>
        </Card.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
