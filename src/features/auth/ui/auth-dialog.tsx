import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import { Dialog } from '@/shared/ui/dialog';

const AuthDialogContentPromise = import('./auth-dialog-content').then(m => ({ default: m.AuthDialogContent }));
const AuthDialogContent = lazy(() => AuthDialogContentPromise);

export function AuthDialog({ dialog }: { dialog: UseDialogReturn }) {
  return (
    <Dialog.Root dialog={dialog}>
      <AuthDialogContent />
    </Dialog.Root>
  );
}
