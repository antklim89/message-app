import type { MessageType } from '@/features/messages';
import { err, errAuthentication, ok } from '@/lib/result';
import { createSupabaseClient } from '@/lib/supabase';

export async function addLike({ messageId }: { messageId: MessageType['id'] }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { error } = await supabase.from('likes').insert({ authorId: user.id, messageId });
  if (error != null) err({ type: 'unexpected', message: 'Failed to like message. Try again later.' });
  return ok(null);
}

export async function removeLike({ messageId }: { messageId: MessageType['id'] }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { error } = await supabase.from('likes').delete().eq('messageId', messageId).eq('authorId', user.id);
  if (error != null) err({ type: 'unexpected', message: 'Failed to unlike message. Try again later.' });
  return ok(null);
}
