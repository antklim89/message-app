import { use } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/shared/model/supabase-types.generated';
import { env } from './env';
import type { User } from '../model/user';

const sbPromise = import('@supabase/supabase-js');
let supabaseClient: SupabaseClient<Database> | undefined;

export async function createSupabaseClient(): Promise<SupabaseClient<Database>> {
  if (supabaseClient != null) return supabaseClient;
  const { createClient } = await sbPromise;
  if (supabaseClient != null) return supabaseClient;
  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  return supabaseClient;
}

export function useSupabase(): SupabaseClient<Database> {
  if (supabaseClient != null) return supabaseClient;
  const { createClient } = use(sbPromise);
  if (supabaseClient != null) return supabaseClient;
  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  return supabaseClient;
}

export async function getSupabaseSession(): Promise<User | null> {
  const supabase = await createSupabaseClient();
  const { data } = await supabase.auth.getSession();

  if (!data?.session) return null;
  return {
    id: data.session.user.id,
    email: data.session.user.email,
    username: data.session.user.user_metadata.username,
  };
}

export function useSupabasePublicUrl(storage: string, mediaUrl?: string | null) {
  const supabase = useSupabase();
  if (!mediaUrl) return;
  const { publicUrl } = supabase.storage.from(storage).getPublicUrl(mediaUrl).data;
  return publicUrl;
}
