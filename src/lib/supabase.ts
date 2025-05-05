import { use } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/database.types';
import { env } from './env';

const sbPromise = import('@supabase/supabase-js');

let sb: SupabaseClient<Database> | undefined;

export function useSupbabase() {
  if (sb != null) return sb;
  const { createClient } = use(sbPromise);
  sb = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  return sb;
}

export async function createSupabaseClient() {
  if (sb != null) return sb;
  const { createClient } = await sbPromise;
  sb = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  return sb;
}
