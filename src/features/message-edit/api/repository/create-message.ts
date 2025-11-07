import type { MessageType } from '@/entities/messages';
import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import type { Json } from '@/shared/model/supabase-types.generated';
import type { MessageEditType } from '../../model/types';

export async function createMessage(answerId: MessageType['answerId'], input: MessageEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const createMessageResult = await supabase
    .from('messages')
    .insert({
      body: input.body as unknown as Json,
      answerId,
      authorId: user.id,
    })
    .select('id')
    .single();
  if (createMessageResult.error) return errUnexpected('Failed to create message.');

  if (input.file) {
    const uploadMediaResult = await supabase.storage
      .from('message_media')
      .update(`${user.id}/${createMessageResult.data.id}`, input.file, { upsert: true });

    if (uploadMediaResult.data) {
      await supabase
        .from('messages')
        .update({ media: uploadMediaResult.data.path })
        .eq('id', createMessageResult.data.id)
        .eq('authorId', user.id);
    }
  }

  return ok(null);
}
