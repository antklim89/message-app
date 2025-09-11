import { errAuthentication, errConflict, errUnexpected, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';

export async function unfollow({ followerId }: { followerId: string }) {
  const supabase = await createSupabaseClient();

  const sessionResult = await supabase.auth.getSession();
  const user = sessionResult.data?.session?.user;
  if (user == null) return errAuthentication('Login to unfollow this user.');

  const { error, count } = await supabase
    .from('followers')
    .delete({ count: 'exact' })
    .eq('followerId', followerId)
    .eq('authorId', user.id);

  if (count === 0) return errConflict('You are already not following this user.');
  if (error != null) return errUnexpected('Failed to stop following this user. Try again later.');

  return ok(null);
}
