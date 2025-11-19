import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import { Dialog } from '@/shared/ui/dialog';
import { MessageEditFormFallback } from './message-edit-form-fallback';

const MessageCreateDialogContentPromise = import('./message-create-dialog-content').then(m => ({
  default: m.MessageCreateDialogContent,
}));
const MessageCreateDialogContent = lazy(() => MessageCreateDialogContentPromise);

export function MessageCreateDialog({ dialog, answerId }: { dialog: UseDialogReturn; answerId: string | undefined }) {
  return (
    <Dialog.Root fallback={<MessageEditFormFallback />} dialog={dialog}>
      <MessageCreateDialogContent answerId={answerId} />
    </Dialog.Root>
  );
}
