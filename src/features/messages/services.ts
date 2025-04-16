import type { ListResult } from 'pocketbase';

import { createPocketbaseClient } from '@/lib/pocketbase';
import { errAuthentication, type PromiseResult, resultResolve } from '@/lib/result';
import type { MessageCreateType, MessageType } from './types';

export async function createMessage({ body, title, answerTo }: MessageCreateType): PromiseResult<MessageType> {
  const pb = await createPocketbaseClient();

  const user = pb.authStore.record;
  if (user == null) return errAuthentication();

  const data = {
    body,
    title,
    author: user.id,
    answerTo,
  };

  const record = await resultResolve(pb.collection('messages').create(data));
  return record;
}

export async function getManyMessages({
  answerTo,
}: {
  answerTo?: string;
} = {}): PromiseResult<ListResult<MessageType>> {
  const pb = await createPocketbaseClient();

  const records = await resultResolve(
    pb.collection('messages').getList(1, 10, {
      sort: '-created',
      filter: `answerTo = '${answerTo ?? ''}'`,
    }),
  );

  return records;
}

export async function getOneMessage(id: MessageType['id']): PromiseResult<MessageType> {
  const pb = await createPocketbaseClient();

  const record = await resultResolve(pb.collection('messages').getOne(id));

  return record;
}
