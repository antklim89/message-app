import { err, errAuthentication, errConflict, ok } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';

export async function removeLike({ messageId }: { messageId: number }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { error, count } = await supabase
    .from('likes')
    .delete({ count: 'exact' })
    .eq('messageId', messageId)
    .eq('authorId', user.id);

  if (count === 0) return errConflict('Message is not liked.');
  if (error != null) return err({ message: 'Failed to unlike message. Try again later.', type: 'unexpected' });

  return ok(null);
}
