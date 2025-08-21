import { type ReactElement, useId } from 'react';
import { Box, Button, Card, Collapsible, HStack, useDisclosure, VStack } from '@chakra-ui/react';

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
      <Collapsible.Content asChild mb={4}>
        <Card.Root alignItems="center" display="flex" flexDirection="row">
          <Card.Body asChild>
            <HStack>
              <Box asChild w="full">
                <MessageEditForm id={id} onSubmit={handleSubmit} />
              </Box>
              <VStack>
                <Button form={id} loading={messageCreateMutation.isPending} loadingText="Creating..." type="submit">
                  Create
                </Button>
                <Button onClick={disclosure.onClose} variant="ghost">
                  Cancel
                </Button>
              </VStack>
            </HStack>
          </Card.Body>
        </Card.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
