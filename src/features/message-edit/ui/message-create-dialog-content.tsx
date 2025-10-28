import { Button, useDialogContext } from '@chakra-ui/react';

import { useAppForm } from '@/shared/lib/react-form';
import { Dialog } from '@/shared/ui/dialog';
import { MessageEditForm, messageEditFormOptions } from './message-edit-form';
import { useMessageCreateMutation } from '../api/mutations/use-message-create-mutation';

export function MessageCreateDialogContent({ answerId }: { answerId: number | undefined }) {
  const dialog = useDialogContext();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  const form = useAppForm({
    ...messageEditFormOptions,
    async onSubmit({ value }) {
      if (!value.body) return;
      const result = await messageCreateMutation.mutateAsync({ body: value.body });
      if (result.success) dialog.setOpen(false);
    },
  });

  return (
    <>
      <Dialog.Title>Create New Message</Dialog.Title>
      <Dialog.Body>
        <MessageEditForm form={form} />
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={form.handleSubmit} loading={messageCreateMutation.isPending} loadingText="Creating...">
          Create
        </Button>
      </Dialog.Footer>
    </>
  );
}
