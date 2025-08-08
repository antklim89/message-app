export type MessageType = {
  answerId?: number;
  authorId: string;
  body: string;
  created: string;
  id: number;
  title: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };

  hasLiked: boolean;
  likesCount: number;
  answersCount: number;
  isFavorite: boolean;
};
