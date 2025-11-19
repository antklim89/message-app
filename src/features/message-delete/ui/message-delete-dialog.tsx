import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Dialog } from '@/shared/ui/dialog';

const MessageDeleteDialogContentPromise = import('./message-delete-dialog-content').then(m => ({
  default: m.MessageDeleteDialogContent,
}));
const MessageDeleteDialogContent = lazy(() => MessageDeleteDialogContentPromise);

export function MessageDeleteDialog({
  dialog,
  ...props
}: {
  id: MessageType['id'];
  dialog: UseDialogReturn;
  deleteRedirectUrl?: string;
}) {
  return (
    <Dialog.Root dialog={dialog}>
      <MessageDeleteDialogContent {...props} />
    </Dialog.Root>
  );
}
