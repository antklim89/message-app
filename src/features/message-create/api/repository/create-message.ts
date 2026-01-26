import type { MessageType } from '@/entities/messages';
import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import type { Database, Json } from '@/shared/model/supabase-types.generated';
import type { MessageEditType } from '../../model/types';

export async function createMessage(answerId: MessageType['answerId'], input: MessageEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const insert: Partial<Database['public']['Tables']['messages']['Insert']> = {};

  if (input.embedded) {
    try {
      const paths = await Promise.all(
        input.embedded.images.map(async image => {
          const { data, error } = await supabase.storage
            .from('gallery')
            .upload(`${user.id}/${crypto.randomUUID()}`, image);
          if (error) throw new Error('Failed to upload image to gallery.');
          return data.path;
        }),
      );

      insert.embeddedItems = paths;
      insert.embeddedType = input.embedded.type;
    } catch {
      return errUnexpected('Failed to upload image to gallery.');
    }
  }

  const createMessageResult = await supabase
    .from('messages')
    .insert({
      ...insert,
      body: input.body as unknown as Json,
      answerId,
      authorId: user.id,
    })
    .select('id')
    .single();

  if (createMessageResult.error) {
    if (
      input.embedded?.type === MessageEmbeddedType.IMAGES &&
      insert.embeddedItems &&
      insert.embeddedItems.length > 0
    ) {
      await supabase.storage.from('gallery').remove(insert.embeddedItems);
    }
    return errUnexpected('Failed to create message.');
  }

  return ok(null);
}
