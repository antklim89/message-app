import { errAuthentication, errUnexpected, ok } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import { GALLERY_IMAGES_LIMIT } from '../../config/constants';

export async function getGalleryList({ nextCursor }: { nextCursor?: string } = {}) {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const { data, error } = await supabase.storage.from('gallery').listV2({
    limit: GALLERY_IMAGES_LIMIT,
    prefix: user.id,
    cursor: nextCursor,
    sortBy: { column: 'updated_at', order: 'desc' },
  });
  if (error != null) return errUnexpected('Failed to update avatar.');

  return ok({
    nextCursor: data.nextCursor,
    urls: data.objects.map(object => object.name),
  });
}
