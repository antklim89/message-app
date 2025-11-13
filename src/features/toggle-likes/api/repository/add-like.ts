import { err, errAuthentication, errConflict, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';

export async function addLike({ messageId }: { messageId: string }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { error } = await supabase.from('likes').insert({ authorId: user.id, messageId });
  if (error != null) {
    if (error.code === '23505') return errConflict('Message is already liked.');
    return err({ message: 'Failed to like message. Try again later.', type: 'unexpected' });
  }
  return ok(null);
}
