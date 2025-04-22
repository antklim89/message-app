import type { ListResult } from 'pocketbase';

import { createPocketbaseClient } from '@/lib/pocketbase';
import { errAuthentication, type PromiseResult, resultMap, resultResolve } from '@/lib/result';
import type { LikesResponse, MessagesResponse, UsersResponse } from '@/pocketbase-types.gen';
import { MESSAGES_PER_PAGE } from './constants';
import type { MessageCreateType, MessageType } from './types';

type MessageShareResponse = Pick<MessagesResponse, 'id' | 'title' | 'body' | 'answerTo' | 'created'> & {
  expand: {
    author: Pick<UsersResponse, 'id' | 'name' | 'avatar'>;
    likes_via_message?: Pick<LikesResponse, 'author'>[];
  };
};

const messageShareOptions = {
  expand: 'author, likes_via_message.message',
  fields: `id,title,body,author,answerTo,created,likes,
    expand.author.id,expand.author.name,expand.author.avatar,
    expand.likes_via_message.author`,
};

const transformMessage = (record: MessageShareResponse, userId?: string): MessageType => ({
  ...record,
  author: record.expand.author,
  likes: {
    count: record.expand.likes_via_message?.length ?? 0,
    hasLiked: userId ? (record.expand.likes_via_message?.some(i => i.author === userId) ?? false) : false,
  },
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

  return resultMap(record, r => transformMessage(r, user.id));
}

export async function getManyMessages({
  answerTo = '',
  page = 1,
}: {
  answerTo?: string;
  page?: number;
} = {}): PromiseResult<ListResult<MessageType>> {
  const pb = await createPocketbaseClient();
  const user = pb.authStore.record;

  const filter = pb.filter('answerTo = {:answerTo}', { answerTo });

  const records = await resultResolve(
    pb.collection<MessageShareResponse>('messages').getList(page, MESSAGES_PER_PAGE, {
      sort: '-created',
      filter,
      ...messageShareOptions,
    }),
  );

  return resultMap(records, item => {
    return {
      ...item,
      items: item.items.map(r => transformMessage(r, user?.id)),
    };
  });
}

export async function getOneMessage(id: MessageType['id']): PromiseResult<MessageType> {
  const pb = await createPocketbaseClient();
  const user = pb.authStore.record;

  const record = await resultResolve(pb.collection<MessageShareResponse>('messages').getOne(id, messageShareOptions));

  return resultMap(record, r => transformMessage(r, user?.id));
}
