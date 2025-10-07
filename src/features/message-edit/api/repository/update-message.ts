import type { MessageType } from '@/entities/messages';
import { errAuthentication, errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import type { Json } from '@/shared/model/supabase-types.generated';
import type { MessageEditType } from '../../model/types';

export async function updateMessage(messageId: MessageType['id'], input: MessageEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const { count, error } = await supabase
    .from('messages')
    .update({ body: input.body as unknown as Json }, { count: 'exact' })
    .eq('authorId', user.id)
    .eq('id', messageId);

  if (count == null || count <= 0) return errNotFound('The message has not been updated.');
  if (error != null) return errUnexpected('Failed to update message.');

  return ok(null);
}
