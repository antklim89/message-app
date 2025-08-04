import { MESSAGE_SELECT, type MessageType } from '@/entities/messages';
import { messageDto } from '@/entities/messages/models/dto';
import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/share/lib/supabase';
import type { MessageCreateType } from '../../model/types';

export async function createMessage({ body, title, answerId }: MessageCreateType): PromiseResult<MessageType> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication();

  const { data, error } = await supabase
    .from('messages')
    .insert({ answerId, body, title, authorId: session.user.id })
    .select(MESSAGE_SELECT)
    .single();

  if (error != null || data == null) return errUnexpected('Failed to create message.');

  return ok(messageDto(data));
}
