import { errUnexpected, errValidation, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import type { CreateUserInput, UserType } from '../../models/types';

export async function createUser({ email, password, username }: CreateUserInput): PromiseResult<UserType | null> {
  const supabase = await createSupabaseClient();

  const profilesResult = await supabase.from('profiles').select('id').eq('username', username).single();
  if (profilesResult.data) return errValidation('Username already taken.', { username: 'Username already taken.' });

  const { data, error } = await supabase.auth.signUp({
    email,
    options: {
      data: { username },
    },
    password,
  });

  if (error?.code === 'user_already_exists') {
    const message = 'User already registered';
    return errValidation(message, { email: message });
  }
  if (error?.code === 'weak_password') {
    return errValidation(error.message, { password: error.message });
  }
  if (error != null) {
    return errUnexpected('Failed to login. Try again later');
  }

  const newUser = data.user;
  if (newUser) ok({ email: newUser.email ?? '', id: newUser.id });
  return ok(null);
}
