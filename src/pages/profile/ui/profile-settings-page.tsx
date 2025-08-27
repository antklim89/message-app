import { ProfileUpdateFallback } from '@/features/profile-edit';
import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { ProfileSettingsLayout } from './profile-settings-layout';

export function ProfileSettingsPage() {
  return (
    <SuspenseErrorBoundary fallback={<ProfileUpdateFallback />}>
      <ProfileSettingsLayout />
    </SuspenseErrorBoundary>
  );
}
