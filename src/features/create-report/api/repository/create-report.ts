import type { MessageType } from '@/entities/messages';
import { errUnexpected, ok, type PromiseResult } from '@/shared/lib/result';
import { createSupabaseClient } from '@/shared/lib/supabase';
import type { ReportCreateType } from '../../model/types';

export async function createReport(id: MessageType['id'], input: ReportCreateType): PromiseResult<null> {
  const supabase = await createSupabaseClient();

  const createReportResult = await supabase.from('reports').insert({
    messageId: id,
    body: input.body,
    category: input.category,
  });
  if (createReportResult.error) return errUnexpected('Failed to create report.');

  return ok(null);
}
