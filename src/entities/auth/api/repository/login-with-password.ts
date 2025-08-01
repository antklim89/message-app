import { err, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';
import type { AuthWithPasswordInput, UserType } from '../../models/types';

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
