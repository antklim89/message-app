import { errAuthentication, errNotFound, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';

export async function getProfile({ profileId }: { profileId?: string } = {}) {
  const supabase = await createSupabaseClient();

  const id = profileId ? profileId : await supabase.auth.getSession().then(({ data }) => data.session?.user.id);
  if (id == null) return errAuthentication();

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) return errNotFound('Failed to load profile. Try again later');

  return ok(profile);
}
