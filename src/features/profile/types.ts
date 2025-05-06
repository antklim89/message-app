export type ProfileType = {
  id: string;
  username: string;
};

export interface ProfileQuery {
  return: ProfileType | null;
  data: ProfileQuery['return'];
  key: ['PROFILE'];
}
