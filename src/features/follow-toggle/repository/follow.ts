import { errAuthentication, errConflict, errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient, getSupabaseSession } from '@/shared/lib/supabase';

export async function follow({ followerId }: { followerId: string }): PromiseResult<null> {
  const supabase = await createSupabaseClient();
  const session = await getSupabaseSession();
  if (session == null) return errAuthentication('Login to follow this user.');

  const { error, count } = await supabase
    .from('followers')
    .insert({ authorId: session.user.id, followerId }, { count: 'exact' });

  if (error && error.code === '23505') return errConflict('You are already following this user.');
  if (error || count === 0) return errUnexpected('Failed to start following this user. Try again later.');

  return ok(null);
}
