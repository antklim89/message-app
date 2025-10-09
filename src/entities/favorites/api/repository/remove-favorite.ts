import { errAuthentication, errConflict, errUnexpected, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';

export async function removeFavorite({ messageId }: { messageId: number }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { error, count } = await supabase
    .from('favorites')
    .delete({ count: 'exact' })
    .eq('messageId', messageId)
    .eq('authorId', user.id);

  if (count === 0) return errConflict('Message is not in favorites.');
  if (error != null) return errUnexpected('Failed to remove message from favorites. Try again later.');

  return ok(null);
}
