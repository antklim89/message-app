import type { MessageType } from '@/entities/messages';
import { errAuthentication, errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';

export async function deleteMessage(id: MessageType['id']): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const { count, error, data } = await supabase
    .from('messages')
    .delete({ count: 'exact' })
    .select('embeddedItems, embeddedType')
    .eq('authorId', user.id)
    .eq('id', id)
    .single();

  if (error != null) return errUnexpected('Failed to delete message.');
  if (count == null || count <= 0) return errNotFound('The message has not been deleted.');

  if (data.embeddedType === MessageEmbeddedType.IMAGES && data.embeddedItems) {
    await supabase.storage.from('message_images').remove(data.embeddedItems);
  }
  if (data.embeddedType === MessageEmbeddedType.VIDEOS && data.embeddedItems) {
    await supabase.storage.from('message_videos').remove(data.embeddedItems);
  }

  return ok(null);
}
