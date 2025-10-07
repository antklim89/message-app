import type { SerializedRootNode } from 'lexical';

export type MessageBody = SerializedRootNode;

export interface MessageType {
  id: number;
  body: MessageBody;
  created: string;
  answerId?: number;
  authorId: string;

  author: {
    id: string;
    username: string;
    avatar?: string;
  };

  hasLiked: boolean;
  likesCount: number;
  answersCount: number;
  isFavorite: boolean;
}
