import { Button, type UseDialogReturn } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import type { MessageType } from '@/entities/messages';
import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { useMessageDeleteMutation } from '../api/mutations/use-message-delete-mutation';

export function MessageDeleteDialog({
  id: messageId,
  dialog,
  deleteRedirectUrl,
}: {
  id: MessageType['id'];
  dialog: UseDialogReturn;
  deleteRedirectUrl?: string;
}) {
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
    <ConfirmDialog
      dialog={dialog}
      confirmElement={
        <Button
          colorPalette="red"
          loading={deleteMutation.isPending}
          loadingText="Deleting..."
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      }
      text="Are you sure you want to delete this message?"
    />
  );
}
