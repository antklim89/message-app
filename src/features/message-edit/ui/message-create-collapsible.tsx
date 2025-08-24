import { type ReactElement } from 'react';
import { Box, Button, Card, Collapsible, HStack, useDisclosure, VStack } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { useAppForm } from '@/share/lib/react-form';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageCreateMutation } from '../api/hooks/use-message-create-mutation';

export function MessageCreateCollapsible({
  answerId,
  trigger,
}: {
  answerId: MessageType['answerId'];
  trigger?: ReactElement;
}) {
  const disclosure = useDisclosure();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  const messageEditForm = useAppForm({
    ...messageEditFormOptions,
    async onSubmit({ formApi, value }) {
      const result = await messageCreateMutation.mutateAsync(value);
      if (result.success) {
        disclosure.onClose();
        formApi.reset();
      }
    },
  });

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
                <MessageEditForm form={messageEditForm} />
              </Box>
              <VStack>
                <Button
                  onClick={messageEditForm.handleSubmit}
                  loading={messageCreateMutation.isPending}
                  loadingText="Creating..."
                  type="submit"
                >
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
