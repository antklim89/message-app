import { errAuthentication, errUnexpected, ok } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';

export async function uploadGalleryRepository({ file }: { file: File }) {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) throw errAuthentication();

  const { error, data } = await supabase.storage.from('gallery').upload(`${user.id}/${crypto.randomUUID()}`, file);
  if (error) return errUnexpected('Failed to upload image to gallery.');

  return ok(data.path);
}
