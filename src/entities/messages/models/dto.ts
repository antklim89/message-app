import type { MessageType } from './types';

export function messageDto(data: {
  answerId: number | null;
  authorId: string;
  body: string;
  created: string;
  id: number;
  title: string;
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
    authorId: data.authorId,
    body: data.body,
    created: data.created,
    id: data.id,
    title: data.title,
    hasLiked: data.hasLiked ?? false,
    likesCount: data.likesCount ?? 0,
    author: {
      id: data.author.id,
      username: data.author.username,
      avatar: data.author.avatar ?? undefined,
    },
    answersCount: data.answersCount[0].count ?? 0,
    isFavorite: data.isFavorite ?? false,
  };
}
