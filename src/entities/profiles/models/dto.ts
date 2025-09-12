import type { ProfileType } from './types';

export function profileDto(data: {
  id: string;
  created: string;
  avatar: string | null;
  bio: string;
  username: string;
  isFollowing: boolean | null;
  followersCount: number | null;
  followingsCount: number | null;
  favoritesCount: number | null;
  messagesCount: number | null;
}): ProfileType {
  return {
    ...data,
    followingsCount: data.followingsCount ?? 0,
    followersCount: data.followersCount ?? 0,
    favoritesCount: data.favoritesCount ?? 0,
    messagesCount: data.messagesCount ?? 0,
    isFollowing: data.isFollowing ?? false,
  };
}
