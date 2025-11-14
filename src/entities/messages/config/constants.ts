export const MESSAGES_PER_PAGE = 20;
export const MESSAGE_SELECT =
  '*, message_media(id), author:authorId(id,username,avatar), hasLiked:message_has_liked, likesCount:message_likes_count, isFavorite:message_in_favorite, answersCount:messages(count)';
export const MESSAGE_SELECT_FAVORITES = `${MESSAGE_SELECT}, favorites!inner(authorId)`;
