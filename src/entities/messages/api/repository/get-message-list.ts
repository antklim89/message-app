import { errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';
import { MESSAGE_SELECT, MESSAGES_PER_PAGE } from '../../config/constants';
import { messageDto } from '../../models/dto';
import type { MessageType } from '../../models/types';

export async function getMessageList({
  answerToId,
  lastId,
}: {
  answerToId?: MessageType['answerToId'];
  lastId?: MessageType['id'];
} = {}): PromiseResult<{ items: MessageType[] }> {
  const supabase = await createSupabaseClient();

  const query = supabase
    .from('messages')
    .select(MESSAGE_SELECT)
    .order('id', { ascending: false })
    .limit(MESSAGES_PER_PAGE);
  if (answerToId != null) query.eq('answerToId', answerToId);
  if (lastId != null) query.lt('id', lastId);

  const { data, error } = await query;
  if (error != null) return errUnexpected('Failed to fetch messages');

  return ok({ items: data.map(messageDto) });
}
