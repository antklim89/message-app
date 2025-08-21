import { err, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';
import { MESSAGE_SELECT } from '../../config/constants';
import { messageDto } from '../../models/dto';
import type { MessageType } from '../../models/types';

export async function getMessage(id: MessageType['id']): PromiseResult<MessageType> {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.from('messages').select(MESSAGE_SELECT).eq('id', id).single();
  if (error != null) return errUnexpected('Failed to fetch messages');
  if (data == null) return err({ message: 'Message not found', type: 'not-found' });

  return ok(messageDto(data));
}
