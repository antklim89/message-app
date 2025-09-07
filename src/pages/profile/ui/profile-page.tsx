import { ProfileFallback } from '@/entities/profiles';
import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { ProfileLayout } from './profile-layout';

export function ProfilePage({ params }: { params: { profileId: string } }) {
  return (
    <SuspenseErrorBoundary fallback={<ProfileFallback />}>
      <ProfileLayout profileId={params.profileId} />
    </SuspenseErrorBoundary>
  );
}
