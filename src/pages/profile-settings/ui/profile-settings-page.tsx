import { ProfileAvatarUpdateFallback, ProfileUpdateFallback } from '@/features/profile-edit';
import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { ProfileSettingsAvatarLayout } from './profile-settings-avatar-layout';
import { ProfileSettingsUpdateLayout } from './profile-settings-update-layout';

export function ProfileSettingsPage() {
  return (
    <>
      <SuspenseErrorBoundary fallback={<ProfileAvatarUpdateFallback />}>
        <ProfileSettingsAvatarLayout />
      </SuspenseErrorBoundary>
      <SuspenseErrorBoundary fallback={<ProfileUpdateFallback />}>
        <ProfileSettingsUpdateLayout />
      </SuspenseErrorBoundary>
    </>
  );
}
