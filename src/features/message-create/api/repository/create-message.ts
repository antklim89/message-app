import type { SupabaseClient } from '@supabase/supabase-js';

import type { MessageType } from '@/entities/messages';
import { errAuthentication, errUnexpected, errValidation, ok, type PromiseResult } from '@/shared/lib/result';
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

  if (input.embeddedType === MessageEmbeddedType.VIDEOS || input.embeddedType === MessageEmbeddedType.IMAGES) {
    await uploadFiles({ input, supabase, user });
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
    await rollbackUploadedFiles({ input, insert, supabase });
    return errUnexpected('Failed to create message.');
  }

  return ok(null);
}

async function uploadFiles({
  input,
  user,
  supabase,
}: {
  input: MessageEditType;
  user: User;
  supabase: SupabaseClient<Database>;
}) {
  if (input.embeddedType !== MessageEmbeddedType.IMAGES && input.embeddedType !== MessageEmbeddedType.VIDEOS) {
    return errUnexpected('Failed to upload images.');
  }

  const files = input.embeddedType !== MessageEmbeddedType.IMAGES ? input.embeddedImages : input.embeddedVideos;
  if (!files || files.length === 0) return errValidation('No files to upload.');

  const bucket = input.embeddedType !== MessageEmbeddedType.IMAGES ? 'message_images' : 'message_videos';
  const path = `${user.id}/${crypto.randomUUID()}`;

  try {
    const paths = await Promise.all(
      files.map(async file => {
        const { data, error } = await supabase.storage.from(bucket).upload(path, file);
        if (error) throw new Error('Failed to upload files.');
        return data.path;
      }),
    );

    return ok(paths);
  } catch {
    return errUnexpected('Failed to upload images.');
  }
}

async function rollbackUploadedFiles({
  input,
  insert,
  supabase,
}: {
  supabase: SupabaseClient<Database>;
  input: MessageEditType;
  insert: Partial<Database['public']['Tables']['messages']['Insert']>;
}) {
  if (insert.embeddedItems && insert.embeddedItems.length > 0) {
    if (input.embeddedType === MessageEmbeddedType.IMAGES) {
      await supabase.storage.from('message_images').remove(insert.embeddedItems);
    }
    if (input.embeddedType === MessageEmbeddedType.VIDEOS) {
      await supabase.storage.from('message_videos').remove(insert.embeddedItems);
    }
  }
}
