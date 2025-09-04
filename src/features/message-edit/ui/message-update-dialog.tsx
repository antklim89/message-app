import type { ReactElement } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { useAppForm } from '@/shared/lib/react-form';
import { FormDialog } from '@/shared/ui/form-dialog';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageUpdateMutation } from '../api/mutations/use-message-update-mutation';
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
    async onSubmit({ value, formApi }) {
      const result = await messageUpdateMutation.mutateAsync(value);
      if (result.success) {
        disclosure.onClose();
      } else {
        formApi.setErrorMap({
          onSubmit: { fields: result.error.issues ?? {}, form: result.error.message },
        });
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
