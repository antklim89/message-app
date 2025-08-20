import { errAuthentication, errConflict, errUnexpected, ok } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';

export async function addFavorite({ messageId }: { messageId: number }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;

  if (user == null) return errAuthentication();

  const { error } = await supabase.from('favorites').insert({ authorId: user.id, messageId });

  if (error != null) {
    if (error.code === '23505') return errConflict('Message is already favorite.');
    return errUnexpected('Failed to add message to favorites. Try again later.');
  }

  return ok(null);
}
