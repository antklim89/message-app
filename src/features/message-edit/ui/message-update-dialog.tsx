import type { ReactElement } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { useAppForm } from '@/share/lib/react-form';
import { FormDialog } from '@/share/ui/form-dialog';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageUpdateMutation } from '../api/hooks/use-message-update-mutation';
import type { MessageEditType } from '../model/types';

export function MessageUpdateDialog({
  message,
  trigger,
}: {
  message: MessageEditType & { id: MessageType['id'] };
  trigger: ReactElement;
}) {
  const disclosure = useDisclosure();
  const messageUpdateMutation = useMessageUpdateMutation({ messageId: message.id });
  const messageEditForm = useAppForm({
    ...messageEditFormOptions,
    defaultValues: { body: message.body },
    async onSubmit({ value }) {
      const result = await messageUpdateMutation.mutateAsync(value);
      if (result.success) {
        disclosure.onClose();
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
          loading={messageUpdateMutation.isPending}
          loadingText="Updating..."
        >
          Update
        </Button>
      }
      title="Update Message"
    />
  );
}
