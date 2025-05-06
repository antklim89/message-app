import { getUser } from '@/features/auth';
import { createSupabaseClient } from '@/lib/supabase';
import type { ProfileType } from './types';

export async function getProfile(): Promise<ProfileType | null> {
  const supabase = await createSupabaseClient();
  const user = await getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) return null;

  return {
    id: profile.id,
    username: profile.username,
  };
}
