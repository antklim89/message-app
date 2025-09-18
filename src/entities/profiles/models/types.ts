export interface ProfileType {
  avatar: string | null;
  bio: string;
  created: string;
  id: string;
  username: string;
  displayname: string;
  isFollowing: boolean;
  followersCount: number;
  followingsCount: number;
  favoritesCount: number;
  messagesCount: number;
}

export interface ProfileListItemType
  extends Pick<ProfileType, 'id' | 'username' | 'avatar' | 'isFollowing' | 'displayname'> {
  isFollower: boolean;
}
