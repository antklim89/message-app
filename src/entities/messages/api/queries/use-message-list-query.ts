import { type InferDataFromTag, infiniteQueryOptions, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { messageQueryOptions } from './use-message-query';
import { MESSAGES_PER_PAGE } from '../../config/constants';
import type { MessageType } from '../../models/types';
import { getMessageList } from '../repository/get-message-list';

export const MessageListQueryOptionsBaseKey = 'MESSAGES';
export type MessageListQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof messageListQueryOptions>['queryFn'],
  ReturnType<typeof messageListQueryOptions>['queryKey']
>;

export function messageListQueryOptions({
  answerId,
  search,
  isFavorites,
  authorId,
}: {
  answerId?: string;
  search?: string;
  isFavorites?: boolean;
  authorId?: MessageType['authorId'];
} = {}) {
  return infiniteQueryOptions({
    queryKey: [MessageListQueryOptionsBaseKey, { answerId, search, isFavorites, authorId }],
    getNextPageParam(data: MessageType[]) {
      if (data.length < MESSAGES_PER_PAGE) return;
      return data.at(-1)?.id ?? undefined;
    },
    initialPageParam: undefined as string | undefined,
    async queryFn({ client, pageParam: lastId }) {
      // throw new Error(
      //   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ab quibusdam nulla cupiditate laboriosam pariatur omnis rem architecto laudantium nisi. Atque doloribus tempora modi. Quod tempora voluptatibus tenetur quasi, a ad! Possimus quia voluptatum voluptas blanditiis aliquam distinctio harum et debitis molestiae sequi nihil quam impedit sed fugit ipsa deleniti, numquam quas magnam ex tempora nam nisi? Temporibus laudantium amet cumque voluptatem ipsam quisquam odit hic iure ab vitae, incidunt enim autem nostrum assumenda exercitationem laborum magni impedit quasi corporis. Officiis unde possimus animi tempora inventore, quas incidunt voluptatum! Maiores vitae, ab nostrum, deserunt adipisci deleniti nemo, delectus excepturi dolorum voluptas error saepe eos tenetur fugit dolore veritatis. Distinctio, doloremque deleniti aspernatur dignissimos iste harum vero impedit ab dicta! Similique incidunt quis eligendi a voluptatum iusto dolorum quisquam voluptatibus! Corrupti, error, aliquid laborum voluptate velit ducimus doloribus odit rerum molestias, quis sapiente optio esse ut eaque dolorum expedita incidunt beatae voluptatum. Quas, aperiam! Quia obcaecati placeat inventore repellendus, dolorum eveniet in. Voluptates sunt, praesentium eum aspernatur et omnis ipsa iure esse a tenetur reiciendis. Saepe, consequuntur! Est quaerat, nemo, ex debitis nobis repellendus totam consequatur doloribus harum fugiat ipsam. Ipsum facilis repellat a assumenda ratione eveniet reiciendis consequuntur ab voluptate.',
      // );
      const { fail, error, result } = await getMessageList({ answerId, lastId, search, isFavorites, authorId });
      if (fail) throw error;

      result.items.flat().forEach(message => {
        client.setQueryData(messageQueryOptions({ id: message.id }).queryKey, message);
      });

      return result.items;
    },
    select(data) {
      return data.pages.flat();
    },
  });
}

export function useMessageListQuery(...args: Parameters<typeof messageListQueryOptions>) {
  return useSuspenseInfiniteQuery(messageListQueryOptions(...args));
}
