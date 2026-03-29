import { errAuthentication, errNotFound, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { followersDto } from '../../models/dto';
import type { FollowerProfileType } from '../../models/types';

export async function getFollowings(): PromiseResult<FollowerProfileType[]> {
  const supabase = await createSupabaseClient();

  const sessionQuery = await supabase.auth.getSession();
  const userId = sessionQuery.data.session?.user.id;
  if (userId == null) return errAuthentication();

  const { data, error } = await supabase.from('followers_view').select('*').eq('authorId', userId);

  if (error) return errNotFound('Failed to load following list. Try again later');

  return ok(data.map(followersDto));
}
