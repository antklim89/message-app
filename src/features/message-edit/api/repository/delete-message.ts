import type { MessageType } from '@/entities/messages';
import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/share/lib/supabase';

export async function deleteMessage(id: MessageType['id']): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { count, error } = await supabase.from('messages').delete({ count: 'exact' }).eq('id', id);

  if (error != null || count == null || count <= 0) return errUnexpected('Message to delete not found.');
  if (error != null) return errUnexpected('Failed to delete message.');

  return ok(null);
}
