import { useProfileQuery } from '@/entities/profiles';
import { ProfileUpdate } from '@/features/profile-edit';
import { useSession } from '@/shared/hooks/use-session';
import { errAuthentication } from '@/shared/lib/result';

export function ProfileSettingsUpdateLayout() {
  const { user } = useSession();
  if (!user?.id) throw errAuthentication().error;
  const profileQuery = useProfileQuery({ profileId: user.id });
  return <ProfileUpdate profileEditValues={profileQuery.data} />;
}
