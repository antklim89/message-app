import { errNotFound, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { profileListItemDto } from '../../models/dto';
import type { ProfileListItemType } from '../../models/types';

export async function getProfileList({ search }: { search: string }): PromiseResult<ProfileListItemType[]> {
  const supabase = await createSupabaseClient();

  const query = supabase
    .from('profiles_view')
    .select('*')
    .order('isFollowing', { ascending: true })
    .order('isFollower', { ascending: true })
    .order('id', { ascending: true })
    .limit(10);

  if (search) query.ilike('username', `%${search}%`);

  const { data, error } = await query;
  if (error) return errNotFound('Failed to load profile. Try again later');

  return ok(data.map(profileListItemDto));
}
