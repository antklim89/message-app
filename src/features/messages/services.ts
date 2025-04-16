import type { ListResult } from 'pocketbase';

import { createPocketbaseClient } from '@/lib/pocketbase';
import { errAuthentication, type PromiseResult, resultMap, resultResolve } from '@/lib/result';
import type { MessagesResponse, UsersResponse } from '@/pocketbase-types.gen';
import type { MessageCreateType, MessageType } from './types';

type MessageShareResponse = Pick<MessagesResponse, 'id' | 'title' | 'body' | 'answerTo' | 'created'> & {
  expand: {
    author: Pick<UsersResponse, 'id' | 'name' | 'avatar'>;
  };
};

const messageShareOptions = {
  expand: 'author',
  fields: 'id,title,body,author,answerTo,created,expand.author.id,expand.author.name,expand.author.avatar',
};

const transformMessage = (record: MessageShareResponse): MessageType => ({
  ...record,
  author: record.expand.author,
});

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

  const record = await resultResolve<MessageShareResponse>(pb.collection('messages').create(data, messageShareOptions));

  return resultMap(record, transformMessage);
}

export async function getManyMessages({
  answerTo,
}: {
  answerTo?: string;
} = {}): PromiseResult<ListResult<MessageType>> {
  const pb = await createPocketbaseClient();

  const records = await resultResolve(
    pb.collection<MessageShareResponse>('messages').getList(1, 10, {
      sort: '-created',
      filter: `answerTo = '${answerTo ?? ''}'`,
      ...messageShareOptions,
    }),
  );

  return resultMap(records, item => {
    return {
      ...item,
      items: item.items.map(transformMessage),
    };
  });
}

export async function getOneMessage(id: MessageType['id']): PromiseResult<MessageType> {
  const pb = await createPocketbaseClient();

  const record = await resultResolve(pb.collection<MessageShareResponse>('messages').getOne(id, messageShareOptions));

  return resultMap(record, transformMessage);
}
