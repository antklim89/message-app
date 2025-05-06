export type AuthWithPasswordInput = {
  email: string;
  password: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  username: string;
};

export type UserType = {
  id: string;
  email: string;
};
