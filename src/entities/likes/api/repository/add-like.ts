import { err, errAuthentication, ok } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';

export async function addLike({ messageId }: { messageId: number }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { error } = await supabase.from('likes').insert({ authorId: user.id, messageId });
  if (error != null) err({ type: 'unexpected', message: 'Failed to like message. Try again later.' });
  return ok(null);
}
