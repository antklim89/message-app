export const MESSAGES_PER_PAGE = 20;
export const MESSAGE_SELECT =
  '*, author:authorId(id,username,avatar), hasLiked, likesCount, answersCount:messages(count)';
