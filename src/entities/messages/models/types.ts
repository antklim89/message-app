export interface MessageType {
  id: number;
  body: string;
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
