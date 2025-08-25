import { errUnexpected, errValidation, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import type { AuthWithPasswordInput } from '../../models/types';

export async function loginWithPassword({ email, password }: AuthWithPasswordInput) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error?.code === 'invalid_credentials') {
    const message = 'Email or password are not valid.';
    return errValidation(message, { email: message, password: message });
  }
  if (error != null) {
    return errUnexpected('Failed to login. Try again later');
  }

  return ok({ email: data.user.email ?? '', id: data.user.id });
}
