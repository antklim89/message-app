import { pb } from '@/lib/pocketbase';
import { errAuthentication, resultResolve } from '@/lib/result';
import type { MessageCreateType } from './types';

export async function createMessage({ body, title }: MessageCreateType) {
  const user = pb.authStore.record;
  if (user == null) return errAuthentication();

  const data = {
    body,
    title,
    author: user.id,
    // "answerTo": // TODO: add answer to a message
  };

  const record = await resultResolve(pb.collection('messages').create(data));
  return record;
}
