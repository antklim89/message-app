import { errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { profileDto } from '../../models/dto';
import type { ProfileType } from '../../models/types';

export async function getProfile({ profileId }: { profileId: string }): PromiseResult<ProfileType> {
  const supabase = await createSupabaseClient();

  const { data: profile, error } = await supabase.from('profiles_view').select('*').eq('id', profileId).single();

  if (error && error.code === 'PGRST116') return errNotFound('Profile not found');
  if (error) return errUnexpected('Failed to load profile. Try again later');

  return ok(profileDto(profile));
}
