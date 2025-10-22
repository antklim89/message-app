import { lazy } from 'react';
import type { UseDialogReturn } from '@chakra-ui/react';

import { Modal } from '@/shared/ui/modal';

const AuthDialogContent = lazy(() => import('./auth-dialog-content').then(m => ({ default: m.AuthDialogContent })));

export function AuthDialog({ dialog }: { dialog: UseDialogReturn }) {
  return (
    <Modal.Root dialog={dialog}>
      <AuthDialogContent />
    </Modal.Root>
  );
}
