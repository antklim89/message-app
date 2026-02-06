import type { SupabaseClient } from '@supabase/supabase-js';

import type { MessageType } from '@/entities/messages';
import { err, errAuthentication, errUnexpected, errValidation, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import type { Database, Json } from '@/shared/model/supabase-types.generated';
import type { User } from '@/shared/model/user';
import type { MessageEditType } from '../../model/types';

export async function createMessage(answerId: MessageType['answerId'], input: MessageEditType): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const user = await getSupabaseSession();
  if (user == null) return errAuthentication();

  const insert: Partial<Database['public']['Tables']['messages']['Insert']> = {};

  if (input.embeddedType === MessageEmbeddedType.IMAGES) {
    const { fail, error, result } = await uploadFiles({
      bucket: 'message_images',
      files: input.embeddedImages,
      user,
      supabase,
    });
    if (fail) return err(error);
    insert.embeddedItems = result;
    insert.embeddedType = input.embeddedType;
  }

  if (input.embeddedType === MessageEmbeddedType.VIDEOS) {
    const { fail, error, result } = await uploadFiles({
      bucket: 'message_videos',
      files: input.embeddedVideos,
      user,
      supabase,
    });
    if (fail) return err(error);
    insert.embeddedItems = result;
    insert.embeddedType = input.embeddedType;
  }

  if (input.embeddedType === MessageEmbeddedType.LINK) {
    insert.embeddedItems = [input.embeddedLink];
    insert.embeddedType = input.embeddedType;
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
    if (insert.embeddedItems && insert.embeddedItems.length > 0) {
      if (input.embeddedType === MessageEmbeddedType.IMAGES) {
        await supabase.storage.from('message_images').remove(insert.embeddedItems);
      }
      if (input.embeddedType === MessageEmbeddedType.VIDEOS) {
        await supabase.storage.from('message_videos').remove(insert.embeddedItems);
      }
    }
    return errUnexpected('Failed to create message.');
  }

  return ok(null);
}

async function uploadFiles({
  bucket,
  files,
  user,
  supabase,
}: {
  bucket: string;
  files?: File[];
  user: User;
  supabase: SupabaseClient<Database>;
}) {
  if (!files || files.length === 0) return errValidation('No files to upload.');
  try {
    const paths = await Promise.all(
      files.map(async file => {
        const { data, error } = await supabase.storage.from(bucket).upload(`${user.id}/${crypto.randomUUID()}`, file);
        if (error) throw new Error('Failed to upload files.');
        return data.path;
      }),
    );

    return ok(paths);
  } catch {
    return errUnexpected('Failed to upload images.');
  }
}
