import { errNotFound, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { followersDto } from '../../models/dto';
import type { FollowerProfileType } from '../../models/types';

export async function getFollowings({ userId }: { userId: string }): PromiseResult<FollowerProfileType[]> {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.from('followers_view').select('*').eq('authorId', userId);

  if (error) return errNotFound('Failed to load following list. Try again later');

  return ok(data.map(followersDto));
}
