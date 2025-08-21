import { err, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';
import type { CreateUserInput, UserType } from '../../models/types';

export async function createUser({ email, password, username }: CreateUserInput): PromiseResult<UserType | null> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    options: {
      data: { username },
    },
    password,
  });

  if (error?.code === 'user_already_exists') {
    const message = 'User already registered';
    return err({
      issues: { email: message },
      message,
      type: 'validation',
    });
  }
  if (error?.code === 'weak_password') {
    return err({ issues: { password: error.message }, message: error.message, type: 'validation' });
  }
  if (error != null) {
    return errUnexpected('Failed to login. Try again later');
  }

  const newUser = data.user;
  if (newUser) ok({ email: newUser.email ?? '', id: newUser.id });
  return ok(null);
}
