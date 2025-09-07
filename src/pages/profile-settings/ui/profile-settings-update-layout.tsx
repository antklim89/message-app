import { useProfileQuery } from '@/entities/profiles';
import { ProfileUpdate } from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';

export function ProfileSettingsUpdateLayout() {
  const session = useSession();
  if (!session.data?.id) throw errAuthentication().error;
  const profileQuery = useProfileQuery({ profileId: session.data.id });
  return <ProfileUpdate profileEditValues={profileQuery.data} />;
}
