export const MESSAGES_PER_PAGE = 20;
export const MESSAGE_SELECT =
  '*, author:authorId(id,username,avatar), hasLiked:message_has_liked, likesCount:message_likes_count, isFavorite:message_in_favorite, answersCount:messages(count)';
