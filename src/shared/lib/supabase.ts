import { use } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/shared/model/supabase-types.generated';
import { env } from './env';

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

export async function getSupabaseSession() {
  const supabase = await createSupabaseClient();
  const sessionResult = await supabase.auth.getSession();

  return sessionResult.data?.session;
}

export function useSupabasePublicUrl(avatarUrl?: string | null) {
  const supabase = useSupabase();
  if (!avatarUrl) return;
  const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(avatarUrl).data;
  return publicUrl;
}
