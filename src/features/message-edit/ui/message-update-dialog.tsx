import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Dialog } from '@/shared/ui/dialog';
import { MessageEditFormFallback } from './message-edit-form-fallback';

const MessageUpdateDialogContent = lazy(() =>
  import('./message-update-dialog-content').then(m => ({ default: m.MessageUpdateDialogContent })),
);

export function MessageUpdateDialog({ message, dialog }: { message: MessageType; dialog: UseDialogReturn }) {
  return (
    <Dialog.Root fallback={<MessageEditFormFallback />} dialog={dialog}>
      <MessageUpdateDialogContent message={message} />
    </Dialog.Root>
  );
}
