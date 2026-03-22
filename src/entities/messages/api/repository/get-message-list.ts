import { errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import type { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import { MESSAGES_PER_PAGE } from '../../config/constants';
import { messageDto } from '../../models/dto';
import type { MessageType } from '../../models/types';

export async function getMessageList({
  answerId,
  lastMessage,
  search,
  isFavorites,
  embeddedType,
  authorId,
}: {
  answerId?: MessageType['answerId'];
  lastMessage?: MessageType;
  search?: string;
  isFavorites?: boolean;
  embeddedType?: MessageEmbeddedType;
  authorId?: MessageType['authorId'];
} = {}): PromiseResult<{ items: MessageType[] }> {
  const supabase = await createSupabaseClient();

  const query = supabase
    .from('messages_view')
    .select('*')
    .order('created', { ascending: false })
    .limit(MESSAGES_PER_PAGE);

  if (answerId == null) query.is('answerId', null);
  else query.eq('answerId', answerId);

  if (isFavorites) query.eq('isFavorite', true);
  if (embeddedType) query.eq('embeddedType', embeddedType);
  if (authorId) query.eq('authorId', authorId);
  if (search) query.textSearch('body', search);
  if (lastMessage != null) query.lt('created', lastMessage.created);

  const { data, error } = await query;
  if (error != null) return errUnexpected('Failed to fetch messages');

  return ok({ items: data.map(messageDto) });
}
