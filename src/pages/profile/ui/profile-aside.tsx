import { ProfilePreview, ProfilePreviewFallback, useProfileQuery } from '@/entities/profiles';
import { ErrorComponent } from '@/shared/ui/error-component';

export function ProfileLayout() {
  const profileQuery = useProfileQuery();
  if (profileQuery.isPending) return <ProfilePreviewFallback />;
  if (profileQuery.isError) return <ErrorComponent error={profileQuery.error} reset={profileQuery.refetch} />;

  return <ProfilePreview profile={profileQuery.data} />;
}
