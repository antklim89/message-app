import { errAuthentication, errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import type { ProfileEditType } from '../../model/types';

export async function updateProfile(input: ProfileEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const { count, error } = await supabase
    .from('profiles')
    .update({ displayname: input.displayname, bio: input.bio }, { count: 'exact' })
    .eq('id', user.id)
    .select('id');

  if (error != null) return errUnexpected('Failed to update profile.');
  if (count == null || count <= 0) return errNotFound('The profile has not been updated.');

  return ok(null);
}
