import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';

export async function updateAvatar(file: File): PromiseResult<string> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { error, data } = await supabase.storage
    .from('avatars')
    .update(session.user.id, file, { cacheControl: 'max-age=0, must-revalidate' });
  if (error != null) return errUnexpected('Failed to update avatar.');

  const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(data.path).data;
  await fetch(publicUrl, { cache: 'reload' }); // reload image cache

  const profileUpdateResult = await supabase.from('profiles').update({ avatar: data.path }).eq('id', session.user.id);
  if (profileUpdateResult.error != null) return errUnexpected('Failed to update avatar.');

  return ok(data.path);
}
