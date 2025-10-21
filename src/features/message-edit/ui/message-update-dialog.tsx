import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Modal } from '@/shared/ui/modal';
import { MessageEditFormFallback } from './fallbacks/message-edit-form-fallback';
import type { MessageEditType } from '../model/types';

const MessageUpdateDialogContent = lazy(() =>
  import('./contents/message-update-dialog-content').then(m => ({ default: m.MessageUpdateDialogContent })),
);

export function MessageUpdateDialog({
  message,
  dialog,
}: {
  message: MessageEditType & { id: MessageType['id'] };
  dialog: UseDialogReturn;
}) {
  return (
    <Modal.Root fallback={<MessageEditFormFallback />} dialog={dialog}>
      <MessageUpdateDialogContent message={message} />
    </Modal.Root>
  );
}
