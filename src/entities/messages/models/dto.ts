import type { Json } from '@/shared/model/supabase-types.generated';
import type { MessageBody, MessageType } from './types';

export function messageDto(data: {
  answerId: number | null;
  authorId: string;
  body: Json;
  created: string;
  id: number;
  hasLiked: boolean | null;
  likesCount: number | null;
  media: string | null;
  author: {
    id: string;
    username: string;
    avatar: string | null;
  };
  answersCount: {
    count: number;
  }[];
  isFavorite: boolean | null;
}): MessageType {
  return {
    answerId: data.answerId ?? undefined,
    answersCount: data.answersCount[0]?.count ?? 0,
    author: {
      avatar: data.author.avatar ?? undefined,
      id: data.author.id,
      username: data.author.username,
    },
    media: data.media,
    authorId: data.authorId,
    body: data.body as unknown as MessageBody,
    created: data.created,
    hasLiked: data.hasLiked ?? false,
    id: data.id,
    isFavorite: data.isFavorite ?? false,
    likesCount: data.likesCount ?? 0,
  };
}
