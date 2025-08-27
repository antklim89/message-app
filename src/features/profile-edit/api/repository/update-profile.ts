import { errAuthentication, errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import type { ProfileEditType } from '../../model/types';

export async function updateProfile(input: ProfileEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { count, error } = await supabase.from('profiles').update(input, { count: 'exact' }).eq('id', session.user.id);

  if (count == null || count <= 0) return errNotFound('The profile has not been updated.');
  if (error != null) return errUnexpected('Failed to update profile.');

  return ok(null);
}
