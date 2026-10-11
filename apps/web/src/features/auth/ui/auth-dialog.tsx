import { lazy, type ReactElement } from 'react';
import { Dialog } from '@message-app/ui/components/dialog';

const AuthDialogContentPromise = import('./auth-dialog-content').then(m => ({ default: m.AuthDialogContent }));
const AuthDialogContent = lazy(() => AuthDialogContentPromise);

export function AuthDialog({ children }: { children: ReactElement }) {
  return (
    <Dialog.Root trigger={children} size="sm">
      <AuthDialogContent />
    </Dialog.Root>
  );
}
