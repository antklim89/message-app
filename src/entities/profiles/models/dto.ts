import type { ProfileType } from './types';

export function profileDto(data: {
  created: string;
  id: string;
  avatar: string | null;
  username: string;
  bio: string;
  isFollowing: boolean | null;
}): ProfileType {
  return {
    ...data,
    isFollowing: data.isFollowing ?? false,
  };
}
