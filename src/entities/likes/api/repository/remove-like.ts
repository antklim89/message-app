import { err, errAuthentication, ok } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';

export async function removeLike({ messageId }: { messageId: number }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { error } = await supabase.from('likes').delete().eq('messageId', messageId).eq('authorId', user.id);
  if (error != null) err({ type: 'unexpected', message: 'Failed to unlike message. Try again later.' });
  return ok(null);
}
