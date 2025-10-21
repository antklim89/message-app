import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Modal } from '@/shared/ui/modal';

const MessageDeleteDialogContent = lazy(() =>
  import('./message-delete-dialog-content').then(m => ({ default: m.MessageDeleteDialogContent })),
);

export function MessageDeleteDialog({
  dialog,
  ...props
}: {
  id: MessageType['id'];
  dialog: UseDialogReturn;
  deleteRedirectUrl?: string;
}) {
  return (
    <Modal.Root dialog={dialog}>
      <MessageDeleteDialogContent {...props} />
    </Modal.Root>
  );
}
