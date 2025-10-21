import { Button, useDialogContext } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import type { MessageType } from '@/entities/messages';
import { Modal } from '@/shared/ui/modal';
import { useMessageDeleteMutation } from '../api/mutations/use-message-delete-mutation';

export function MessageDeleteDialogContent({
  id: messageId,
  deleteRedirectUrl,
}: {
  id: MessageType['id'];
  deleteRedirectUrl?: string;
}) {
  const dialog = useDialogContext();
  const deleteMutation = useMessageDeleteMutation({ id: messageId });
  const navigate = useNavigate();

  async function handleDelete() {
    const result = await deleteMutation.mutateAsync();
    if (result.success) {
      dialog.setOpen(false);
      if (deleteRedirectUrl) await navigate({ to: deleteRedirectUrl });
    }
  }

  return (
    <>
      <Modal.Title>Are you sure you want to delete this message?</Modal.Title>
      <Modal.Footer>
        <Button
          colorPalette="red"
          loading={deleteMutation.isPending}
          loadingText="Deleting..."
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
}
