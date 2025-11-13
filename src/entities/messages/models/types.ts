import type { SerializedRootNode } from 'lexical';

export type MessageBody = SerializedRootNode;

export interface MessageType {
  id: string;
  body: MessageBody;
  created: string;
  answerId?: string;
  authorId: string;

  media: string | null;

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
