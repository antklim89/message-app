import { errAuthentication, errNotFound, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import type { FollowerProfileType } from '../../models/types';

export async function getFollowers(): PromiseResult<FollowerProfileType[]> {
  const supabase = await createSupabaseClient();

  const sessionQuery = await supabase.auth.getSession();
  const userId = sessionQuery.data.session?.user.id;
  if (userId == null) return errAuthentication();

  const { data, error } = await supabase
    .from('followers')
    .select('*, followers:profiles!authorId(id, username, avatar, isFollowing:is_following)')
    .eq('followerId', userId);

  if (error) return errNotFound('Failed to load followers list. Try again later');

  return ok(data.map(i => ({ ...i.followers, isFollowing: i.followers.isFollowing ?? false })));
}
