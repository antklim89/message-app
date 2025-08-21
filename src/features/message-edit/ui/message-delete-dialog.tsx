import { Button, useDisclosure } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { ConfirmDialog } from '@/share/ui/confirm-dialog';
import { useMessageDeleteMutation } from '../api/hooks/use-message-delete-mutation';

export function MessageDeleteDialog({ id: messageId, trigger }: { id: MessageType['id']; trigger: React.ReactNode }) {
  const deleteMutation = useMessageDeleteMutation({ id: messageId });
  const disclosure = useDisclosure();

  async function handleDelete() {
    const result = await deleteMutation.mutateAsync();
    if (result.success) disclosure.onClose();
  }

  return (
    <ConfirmDialog
      {...disclosure}
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
      trigger={trigger}
    />
  );
}
