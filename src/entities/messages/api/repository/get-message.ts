import { errNotFound, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import { MESSAGE_SELECT } from '../../config/constants';
import { messageDto } from '../../models/dto';
import type { MessageType } from '../../models/types';

export async function getMessage(id: MessageType['id']): PromiseResult<MessageType> {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.from('messages').select(MESSAGE_SELECT).eq('id', id).single();

  if (error && error.code === 'PGRST116') return errNotFound('Message not found');
  if (error != null) return errUnexpected('Failed to fetch messages');

  return ok(messageDto(data));
}
