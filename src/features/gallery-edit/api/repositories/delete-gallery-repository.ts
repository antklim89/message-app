import { errAuthentication, errUnexpected, ok } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';

export async function deleteGalleryRepository({ paths }: { paths: string[] }) {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) throw errAuthentication();

  const { error } = await supabase.storage.from('gallery').remove(paths);
  if (error) return errUnexpected('Failed to delete image.');

  return ok(null);
}
