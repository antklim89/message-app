import type { FollowerProfileType } from './types';

export function followersDto(data: {
  authorId: string | null;
  avatar: string | null;
  followerId: string | null;
  isFollowing: boolean | null;
  username: string | null;
}): FollowerProfileType {
  return {
    id: data.authorId ?? '',
    avatar: data.avatar,
    username: data.username ?? '',
    isFollowing: data.isFollowing ?? false,
  };
}
