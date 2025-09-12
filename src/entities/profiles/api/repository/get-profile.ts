import { errAuthentication, errNotFound, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { profileDto } from '../../models/dto';
import { type ProfileType } from '../../models/types';

export async function getProfile({ profileId }: { profileId: string }): PromiseResult<ProfileType> {
  const supabase = await createSupabaseClient();

  const id = profileId ? profileId : await supabase.auth.getSession().then(({ data }) => data.session?.user.id);
  if (id == null) return errAuthentication();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(
      '*, isFollowing:is_following, followersCount:followers_count, followingsCount:followings_count, favoritesCount:favorites_count, messagesCount:messages_count',
    )
    .eq('id', id)
    .single();

  if (error) return errNotFound('Failed to load profile. Try again later');

  return ok(profileDto(profile));
}
