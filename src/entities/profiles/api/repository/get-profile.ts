import { errAuthentication, errNotFound, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';

export async function getProfile() {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) return errNotFound('Failed to load profile. Try again later');

  return ok(profile);
}
