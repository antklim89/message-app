import { Box } from '@chakra-ui/react';

import { ProfileUpdateFallback } from '@/features/profile-edit';
import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { ProfileSettingsAvatarLayout } from './profile-settings-avatar-layout';
import { ProfileSettingsLayout } from './profile-settings-layout';

export function ProfileSettingsPage() {
  return (
    <>
      <Box>
        <ProfileSettingsAvatarLayout />
      </Box>
      <SuspenseErrorBoundary fallback={<ProfileUpdateFallback />}>
        <ProfileSettingsLayout />
      </SuspenseErrorBoundary>
    </>
  );
}
