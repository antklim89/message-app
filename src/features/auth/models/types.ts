export interface AuthWithPasswordInput {
  email: string;
  password: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  username: string;
}

export interface UserType {
  id: string;
  email: string;
}
