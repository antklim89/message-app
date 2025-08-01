import { err, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';
import type { CreateUserInput, UserType } from '../../models/types';

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
