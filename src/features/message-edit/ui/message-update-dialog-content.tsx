import { Button, useDialogContext } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { useAppForm } from '@/shared/lib/react-form';
import { Dialog } from '@/shared/ui/dialog';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageUpdateMutation } from '../api/mutations/use-message-update-mutation';
import type { MessageEditType } from '../model/types';

export function MessageUpdateDialogContent({ message }: { message: MessageEditType & { id: MessageType['id'] } }) {
  const dialog = useDialogContext();
  const messageUpdateMutation = useMessageUpdateMutation({ messageId: message.id });

  const form = useAppForm({
    ...messageEditFormOptions,
    defaultValues: { body: message.body },
    async onSubmit({ value }) {
      if (!value.body) return;
      const result = await messageUpdateMutation.mutateAsync({ body: value.body });
      if (result.success) dialog.setOpen(false);
    },
  });

  return (
    <>
      <Dialog.Title>Update Message</Dialog.Title>
      <Dialog.Body>
        <MessageEditForm form={form} />
      </Dialog.Body>

      <Dialog.Footer>
        <Button onClick={form.handleSubmit} loading={messageUpdateMutation.isPending} loadingText="Updating...">
          Update
        </Button>
      </Dialog.Footer>
    </>
  );
}
