import { err, errAuthentication, errUnexpected, ok, type PromiseResult } from '@/lib/result';
import { createSupabaseClient } from '@/lib/supabase';
import { MESSAGES_PER_PAGE } from './constants';
import type { MessageCreateType, MessageType } from './types';

const SELECT = '*, author:authorId(id,username), hasLiked, likesCount';

export async function createMessage({ body, title, answerToId }: MessageCreateType): PromiseResult<MessageType> {
  const supabase = await createSupabaseClient();
  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { data, error } = await supabase
    .from('messages')
    .insert({ answerToId, body, title, authorId: user.id })
    .select(SELECT)
    .single();

  if (error != null) return errUnexpected('Failed to create message.');

  return ok(data);
}

export async function getManyMessages({
  answerTo,
  lastId,
}: {
  answerTo?: number;
  lastId?: MessageType['id'];
} = {}): PromiseResult<{ items: MessageType[] }> {
  const supabase = await createSupabaseClient();

  const query = supabase.from('messages').select(SELECT).limit(MESSAGES_PER_PAGE);
  if (answerTo != null) query.eq('answerToId', answerTo);
  if (lastId != null) query.lt('id', lastId);

  const { data, error } = await query;
  if (error != null) return errUnexpected('Failed to fetch messages');

  return ok({ items: data });
}

export async function getOneMessage(id: MessageType['id']): PromiseResult<MessageType> {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.from('messages').select(SELECT).eq('id', id).single();
  if (error != null) return errUnexpected('Failed to fetch messages');
  if (data == null) return err({ type: 'not-found', message: 'Message not found' });

  return ok(data);
}
