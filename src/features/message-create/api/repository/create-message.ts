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
      embeddedType: input.embeddedType,
      embeddedItems: input.embeddedItems && input.embeddedItems.length > 0 ? input.embeddedItems : undefined,
      answerId,
      authorId: user.id,
    })
    .select('id')
    .single();
  if (createMessageResult.error) return errUnexpected('Failed to create message.');

  return ok(null);
}
