import type { ReactElement } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { useAppForm } from '@/shared/lib/react-form';
import { FormDialog } from '@/shared/ui/form-dialog';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageCreateMutation } from '../api/hooks/use-message-create-mutation';

export function MessageCreateDialog({
  answerId,
  trigger,
}: {
  answerId: MessageType['answerId'];
  trigger: ReactElement;
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
    <FormDialog
      {...disclosure}
      formElement={<MessageEditForm form={messageEditForm} />}
      openElement={trigger}
      submitElement={
        <Button
          onClick={messageEditForm.handleSubmit}
          loading={messageCreateMutation.isPending}
          loadingText="Creating..."
        >
          Create
        </Button>
      }
      title="Create New Message"
    />
  );
}
