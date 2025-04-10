import { ClientResponseError } from 'pocketbase';

import { flattenPocketbaseErrors, pb } from '@/lib/pocketbase';
import { err, resultResolve } from '@/lib/result';
import type { AuthWithPasswordInput, CreateUserInput } from './types';

export async function loginWithPassword({ email, password }: AuthWithPasswordInput) {
  const result = await resultResolve(
    pb.collection('users').authWithPassword(email, password),
    error =>
      error instanceof ClientResponseError &&
      error.status === 400 &&
      err({ message: 'Username or password are not valid.' }),
    () => err({ message: 'Failed to login. Try again later', type: 'unexpected' }),
  );

  return result;
}

export async function createUser({ email, password, username }: CreateUserInput) {
  const data = {
    email,
    name: username,
    password,
    passwordConfirm: password,
  };

  const result = await resultResolve(
    pb.collection('users').create(data),
    error =>
      error instanceof ClientResponseError &&
      error.status === 400 &&
      err({ errors: flattenPocketbaseErrors(error), message: error.message, type: 'validation' }),
    () => err({ message: 'Failed to create user. Try again later', type: 'unexpected' }),
  );

  return result;
}

export const logout = () => {
  return pb.authStore.clear();
};
