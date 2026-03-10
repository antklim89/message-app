import { errNotFound, ok } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import type { HashtagsPeriod } from '../../model/types';

export async function getHashtags({ period }: { period: HashtagsPeriod }) {
  const supabase = await createSupabaseClient();

  const query = period === 'month' ? supabase.from('hashtags_month_top_view') : supabase.from('hashtags_week_top_view');

  const { data, error } = await query.select('hashtag, count');
  if (error || data == null) return errNotFound(`Failed to load hashtags for ${period}. Try again later`);

  return ok(data);
}
