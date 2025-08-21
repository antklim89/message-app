import type { MessageType } from './types';

export function messageDto(data: {
  answerId: number | null;
  authorId: string;
  body: string;
  created: string;
  id: number;
  hasLiked: boolean | null;
  likesCount: number | null;
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
    authorId: data.authorId,
    body: data.body,
    created: data.created,
    hasLiked: data.hasLiked ?? false,
    id: data.id,
    isFavorite: data.isFavorite ?? false,
    likesCount: data.likesCount ?? 0,
  };
}
