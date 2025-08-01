import { errAuthentication, errUnexpected, ok, type PromiseResult } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';
import type { ProfileType } from '../../models/types';

export async function getProfile(): PromiseResult<ProfileType | null> {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication();

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) return errUnexpected(error.message);

  return ok({
    id: profile.id,
    username: profile.username,
  });
}
