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
      issues: { email: message, password: message },
    });
  }
  if (error != null) {
    return errUnexpected('Failed to login. Try again later');
  }

  return ok({ id: data.user.id, email: data.user.email ?? '' });
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
      issues: { email: message },
    });
  }
  if (error?.code === 'weak_password') {
    return err({ type: 'validation', message: error.message, issues: { password: error.message } });
  }
  if (error != null) {
    return errUnexpected('Failed to login. Try again later');
  }

  const newUser = data.user;
  if (newUser) ok({ id: newUser.id, email: newUser.email ?? '' });
  return ok(null);
}

export async function logout() {
  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error != null) return errUnexpected('Failed to logout.');

  return ok(null);
}

export async function getUser(): Promise<UserType | null> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error != null) return null;

  if (data.session == null) return null;

  return {
    id: data.session.user.id,
    email: data.session.user.email ?? '',
  };
}
