import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import { Modal } from '@/shared/ui/modal';
import { MessageEditFormFallback } from './fallbacks/message-edit-form-fallback';

const MessageCreateDialogContent = lazy(() =>
  import('./contents/message-create-dialog-content').then(m => ({ default: m.MessageCreateDialogContent })),
);

export function MessageCreateDialog({ dialog, answerId }: { dialog: UseDialogReturn; answerId: number | undefined }) {
  return (
    <Modal.Root fallback={<MessageEditFormFallback />} dialog={dialog}>
      <MessageCreateDialogContent answerId={answerId} />
    </Modal.Root>
  );
}
