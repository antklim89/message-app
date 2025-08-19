import { MESSAGE_SELECT, type MessageType } from '@/entities/messages';
import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/share/lib/supabase';
import type { MessageEditType } from '../../model/types';

export async function createMessage(answerId: MessageType['answerId'], input: MessageEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { error } = await supabase
    .from('messages')
    .insert({ ...input, answerId, authorId: session.user.id })
    .select(MESSAGE_SELECT);

  if (error != null) return errUnexpected('Failed to create message.');

  return ok(null);
}
