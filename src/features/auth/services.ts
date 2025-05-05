import { err, errUnexpected, ok, type PromiseResult } from '@/lib/result';
import { createSupabaseClient } from '@/lib/supabase';
import type { AuthWithPasswordInput, CreateUserInput, UserType } from './types';

export async function loginWithPassword({ email, password }: AuthWithPasswordInput): PromiseResult<UserType> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error?.code === 'invalid_credentials') {
    const message = 'Email or password are not valid.';
    return err({
      type: 'validation',
      message,
      errors: { email: message, password: message },
    });
  }
  if (error != null) {
    return errUnexpected('Failed to login. Try again later');
  }

  return ok({ id: data.user.id, username: data.user.user_metadata.username });
}

export async function createUser({ email, password, username }: CreateUserInput): PromiseResult<UserType | null> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error?.code === 'user_already_exists') {
    const message = 'User already registered';
    return err({
      type: 'validation',
      message,
      errors: { email: message },
    });
  }
  if (error?.code === '"weak_password"') {
    return err({ type: 'validation', message: error.message, errors: { password: error.message } });
  }
  if (error != null) {
    return errUnexpected('Failed to login. Try again later');
  }

  const newUser = data.user;
  if (newUser) ok({ id: newUser.id, username: newUser.user_metadata.username });
  return ok(null);
}

export async function isAuthenticated(): Promise<boolean> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error != null) return false;

  if (data.session != null) return true;
  return false;
}

export async function logout() {
  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error != null) return errUnexpected('Failed to logout.');

  return ok(null);
}
