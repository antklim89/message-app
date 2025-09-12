export interface ProfileType {
  avatar: string | null;
  bio: string;
  created: string;
  id: string;
  username: string;
  isFollowing: boolean;
  followersCount: number;
  followingsCount: number;
  favoritesCount: number;
  messagesCount: number;
}
