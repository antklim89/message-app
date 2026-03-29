import type { ProfileListItemType, ProfileType } from './types';

export function profileDto(data: {
  id: string | null;
  created: string | null;
  avatar: string | null;
  bio: string | null;
  username: string | null;
  displayname: string | null;
  isFollowing: boolean | null;
  followersCount: number | null;
  followingsCount: number | null;
  favoritesCount: number | null;
  messagesCount: number | null;
}): ProfileType {
  return {
    id: data.id ?? '',
    created: data.created ?? '',
    avatar: data.avatar,
    bio: data.bio ?? '',
    username: data.username ?? '',
    displayname: data.displayname ?? '',
    followingsCount: data.followingsCount ?? 0,
    followersCount: data.followersCount ?? 0,
    favoritesCount: data.favoritesCount ?? 0,
    messagesCount: data.messagesCount ?? 0,
    isFollowing: data.isFollowing ?? false,
  };
}
export function profileListItemDto(data: {
  id: string | null;
  avatar: string | null;
  username: string | null;
  displayname: string | null;
  isFollowing: boolean | null;
  isFollower: boolean | null;
}): ProfileListItemType {
  return {
    id: data.id ?? '',
    avatar: data.avatar,
    username: data.username ?? '',
    displayname: data.displayname ?? '',
    isFollowing: data.isFollowing ?? false,
    isFollower: data.isFollower ?? false,
  };
}
