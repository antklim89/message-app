import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';

export async function deleteAvatar(): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const avatarUpdateResult = await supabase.storage.from('avatars').remove([user.id]);
  if (avatarUpdateResult.error != null) return errUnexpected('Failed to remove avatar.');

  const profileUpdateResult = await supabase.from('profiles').update({ avatar: null }).eq('id', user.id);
  if (profileUpdateResult.error != null) return errUnexpected('Failed to remove avatar.');

  return ok(null);
}
