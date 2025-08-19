import { MESSAGE_SELECT, type MessageType } from '@/entities/messages';
import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/share/lib/supabase';
import type { MessageEditType } from '../../model/types';

export async function updateMessage(messageId: MessageType['id'], input: MessageEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { error } = await supabase
    .from('messages')
    .update(input)
    .eq('authorId', session.user.id)
    .eq('id', messageId)
    .select(MESSAGE_SELECT);

  if (error != null) return errUnexpected('Failed to update message.');

  return ok(null);
}
