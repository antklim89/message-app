import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { Dialog } from '@/shared/ui/dialog';
import { ReportCreateFormFallback } from './report-create-form-fallback';

const ReportCreateDialogContentPromise = import('./report-create-dialog-content').then(async m => ({
  default: m.ReportCreateDialogContent,
}));
const ReportCreateDialogContent = lazy(() => ReportCreateDialogContentPromise);

export function MessageCreateDialog({ dialog, messageId }: { dialog: UseDialogReturn; messageId: MessageType['id'] }) {
  return (
    <Dialog.Root fallback={<ReportCreateFormFallback />} dialog={dialog}>
      <ReportCreateDialogContent messageId={messageId} />
    </Dialog.Root>
  );
}
