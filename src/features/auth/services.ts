import { err, errUnexpected, ok } from '@/lib/result';
import { createSupabaseClient } from '@/lib/supabase';
import type { AuthWithPasswordInput, CreateUserInput } from './types';

export async function loginWithPassword({ email, password }: AuthWithPasswordInput) {
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

  return ok(data.user);
}

export async function createUser({ email, password, username }: CreateUserInput) {
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

  return ok(data.user);
}

export async function logout() {
  const supabase = await createSupabaseClient();
  await supabase.auth.signOut();
}
