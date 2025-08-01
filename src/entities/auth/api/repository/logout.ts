import { errUnexpected, ok } from '@/share/lib/result';
import { createSupabaseClient } from '@/share/lib/supabase';

export async function logout() {
  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error != null) return errUnexpected('Failed to logout.');

  return ok(null);
}
