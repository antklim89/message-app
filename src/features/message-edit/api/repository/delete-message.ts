import type { MessageType } from '@/entities/messages';
import { errAuthentication, errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';

export async function deleteMessage(id: MessageType['id']): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { count, error } = await supabase
    .from('messages')
    .delete({ count: 'exact' })
    .eq('authorId', session.user.id)
    .eq('id', id);

  if (count == null || count <= 0) return errNotFound('The message has not been deleted.');
  if (error != null) return errUnexpected('Failed to delete message.');

  return ok(null);
}
