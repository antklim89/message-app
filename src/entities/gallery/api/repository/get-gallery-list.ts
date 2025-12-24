import { errUnexpected, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { GALLERY_IMAGES_LIMIT } from '../../config/constants';

export async function getGalleryList({ nextCursor, authorId }: { nextCursor?: string; authorId: string }) {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.storage.from('gallery').listV2({
    limit: GALLERY_IMAGES_LIMIT,
    prefix: authorId,
    cursor: nextCursor,
    sortBy: { column: 'updated_at', order: 'desc' },
  });
  if (error != null) return errUnexpected('Failed to update avatar.');

  return ok({
    nextCursor: data.nextCursor,
    images: data.objects.map(object => ({
      url: object.name,
      createdAt: object.created_at,
    })),
  });
}
