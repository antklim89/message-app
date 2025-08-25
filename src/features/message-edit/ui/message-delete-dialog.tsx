import { type ReactElement } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import type { MessageType } from '@/entities/messages';
import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { useMessageDeleteMutation } from '../api/hooks/use-message-delete-mutation';

export function MessageDeleteDialog({
  id: messageId,
  openElement,
  deleteRedirectUrl,
}: {
  id: MessageType['id'];
  openElement: ReactElement;
  deleteRedirectUrl?: string;
}) {
  const deleteMutation = useMessageDeleteMutation({ id: messageId });
  const disclosure = useDisclosure();
  const navigate = useNavigate();

  async function handleDelete() {
    const result = await deleteMutation.mutateAsync();
    if (result.success) {
      disclosure.onClose();
      if (deleteRedirectUrl) await navigate({ to: deleteRedirectUrl });
    }
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
      openElement={openElement}
    />
  );
}
