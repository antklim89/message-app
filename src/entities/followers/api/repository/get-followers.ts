import { errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { followersDto } from '../../models/dto';
import type { FollowerProfileType } from '../../models/types';

export async function getFollowers({ userId }: { userId: string }): PromiseResult<FollowerProfileType[]> {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.from('followers_view').select('*').eq('followerId', userId);

  if (error) return errUnexpected('Failed to load followers list. Try again later');

  return ok(data.map(followersDto));
}
