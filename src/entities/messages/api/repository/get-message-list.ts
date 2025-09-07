import { errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { MESSAGE_SELECT, MESSAGE_SELECT_FAVORITES, MESSAGES_PER_PAGE } from '../../config/constants';
import { messageDto } from '../../models/dto';
import type { MessageType } from '../../models/types';

export async function getMessageList({
  answerId,
  lastId,
  search,
  isFavorites,
  authorId,
}: {
  answerId?: MessageType['answerId'];
  lastId?: MessageType['id'];
  search?: string;
  isFavorites?: boolean;
  authorId?: MessageType['authorId'];
} = {}): PromiseResult<{ items: MessageType[] }> {
  const supabase = await createSupabaseClient();
  const session = await supabase.auth.getSession();
  const user = session.data?.session?.user;

  const query =
    isFavorites && user
      ? supabase.from('messages').select(MESSAGE_SELECT_FAVORITES).eq('favorites.authorId', user?.id)
      : supabase.from('messages').select(MESSAGE_SELECT);

  query.order('id', { ascending: false }).limit(MESSAGES_PER_PAGE);

  if (answerId == null) query.is('answerId', null);
  else query.eq('answerId', answerId);

  if (authorId) query.eq('authorId', authorId);
  if (search) query.textSearch('body', search);
  if (lastId != null) query.lt('id', lastId);

  const { data, error } = await query;
  if (error != null) return errUnexpected('Failed to fetch messages');

  return ok({ items: data.map(messageDto) });
}
