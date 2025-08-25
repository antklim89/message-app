import { type MessageType } from '@/entities/messages';
import { errAuthentication, errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import type { MessageEditType } from '../../model/types';

export async function updateMessage(messageId: MessageType['id'], input: MessageEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { count, error } = await supabase
    .from('messages')
    .update(input, { count: 'exact' })
    .eq('authorId', session.user.id)
    .eq('id', messageId);

  if (count == null || count <= 0) return errNotFound('The message has not been updated.');
  if (error != null) return errUnexpected('Failed to update message.');

  return ok(null);
}
