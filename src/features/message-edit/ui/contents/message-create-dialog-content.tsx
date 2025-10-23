import { Button, useDialogContext } from '@chakra-ui/react';

import { Dialog } from '@/shared/ui/dialog';
import { useRichTextHandler } from '@/shared/ui/rich-text-editor';
import { useMessageCreateMutation } from '../../api/mutations/use-message-create-mutation';
import { MAX_MESSAGE_BODY_LENGTH, MIN_MESSAGE_BODY_LENGTH } from '../../config/constants';
import { MessageEditForm } from '../forms/message-edit-form';

export function MessageCreateDialogContent({ answerId }: { answerId: number | undefined }) {
  const dialog = useDialogContext();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  const { ref, handleSubmit } = useRichTextHandler({
    maxLength: MAX_MESSAGE_BODY_LENGTH,
    minLength: MIN_MESSAGE_BODY_LENGTH,
    async onSubmit(value) {
      if (!value) return;
      const result = await messageCreateMutation.mutateAsync({ body: value });
      if (result.success) dialog.setOpen(false);
    },
  });

  return (
    <>
      <Dialog.Title>Create New Message</Dialog.Title>
      <Dialog.Body>
        <MessageEditForm onEnterKeyDown={handleSubmit} ref={ref} />
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={handleSubmit} loading={messageCreateMutation.isPending} loadingText="Creating...">
          Create
        </Button>
      </Dialog.Footer>
    </>
  );
}
