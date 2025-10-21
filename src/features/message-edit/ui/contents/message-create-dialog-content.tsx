import { Button, useDialogContext } from '@chakra-ui/react';

import { Modal } from '@/shared/ui/modal';
import { useMessageCreateMutation } from '../../api/mutations/use-message-create-mutation';
import { useRichTextHandler } from '../../lib/hooks/use-rich-text-handler';
import { MessageEditForm } from '../forms/message-edit-form';

export function MessageCreateDialogContent({ answerId }: { answerId: number | undefined }) {
  const dialog = useDialogContext();
  const messageCreateMutation = useMessageCreateMutation({ answerId });

  const { ref, handleSubmit } = useRichTextHandler({
    async onSubmit(value) {
      if (!value) return;
      const result = await messageCreateMutation.mutateAsync({ body: value });
      if (result.success) dialog.setOpen(false);
    },
  });

  return (
    <>
      <Modal.Title>Create New Message</Modal.Title>
      <Modal.Body>
        <MessageEditForm onEnterKeyDown={handleSubmit} ref={ref} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} loading={messageCreateMutation.isPending} loadingText="Creating...">
          Create
        </Button>
      </Modal.Footer>
    </>
  );
}
