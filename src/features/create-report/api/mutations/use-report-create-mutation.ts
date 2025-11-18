import { useMutation } from '@tanstack/react-query';

import type { MessageType } from '@/entities/messages';
import { toaster } from '@/shared/lib/toaster';
import type { ReportCreateType } from '../../model/types';
import { createReport } from '../repository/create-report';

export function useReportCreateMutation({ messageId }: { messageId: MessageType['id'] }) {
  return useMutation({
    async mutationFn(input: ReportCreateType) {
      const createReportResult = await createReport(messageId, input);
      return createReportResult;
    },
    onSuccess({ fail, success, error }) {
      if (fail) toaster.error({ description: error.message });
      if (success) toaster.success({ description: 'Report created successfully!' });
    },
  });
}
