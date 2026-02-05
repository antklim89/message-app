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

  if (
    input.embedded &&
    (input.embedded.type === 'images' || input.embedded.type === 'videos') &&
    input.embedded.files &&
    input.embedded.files.length > 0
  ) {
    const storageId = input.embedded.type === 'images' ? 'message_images' : 'message_videos';
    try {
      const paths = await Promise.all(
        input.embedded.files.map(async file => {
          const path = `${user.id}/${crypto.randomUUID()}`;
          const { data, error } = await supabase.storage.from(storageId).upload(path, file);
          if (error) throw new Error('Failed to upload files.');
          return data.path;
        }),
      );

      insert.embeddedItems = paths;
      insert.embeddedType = input.embedded.type;
    } catch {
      return errUnexpected('Failed to upload files.');
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
      await supabase.storage.from('message_images').remove(insert.embeddedItems);
    }
    return errUnexpected('Failed to create message.');
  }

  return ok(null);
}
