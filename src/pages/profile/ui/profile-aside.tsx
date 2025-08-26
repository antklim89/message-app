import { ProfilePreviewFallback } from '@/entities/profiles';
import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { ProfileAsideLayout } from './profile-aside-layout';

export function ProfileAside() {
  return (
    <SuspenseErrorBoundary fallback={<ProfilePreviewFallback />}>
      <ProfileAsideLayout />
    </SuspenseErrorBoundary>
  );
}
