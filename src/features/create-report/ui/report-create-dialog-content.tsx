import { Button, useDialogContext } from '@chakra-ui/react';

import { useAppForm } from '@/shared/lib/react-form';
import { Dialog } from '@/shared/ui/dialog';
import { ReportCreateForm, reportCreateFormOptions } from './report-create-form';
import { useReportCreateMutation } from '../api/mutations/use-report-create-mutation';

export function ReportCreateDialogContent({ messageId }: { messageId: string }) {
  const dialog = useDialogContext();
  const reportCreateMutation = useReportCreateMutation({ messageId });

  const form = useAppForm({
    ...reportCreateFormOptions,
    async onSubmit({ value }) {
      if (!value.body) return;
      const result = await reportCreateMutation.mutateAsync({ body: value.body, category: value.category });
      if (result.success) dialog.setOpen(false);
    },
  });

  return (
    <>
      <Dialog.Title>Create Report</Dialog.Title>
      <Dialog.Body>
        <ReportCreateForm form={form} />
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={form.handleSubmit} loading={reportCreateMutation.isPending} loadingText="Creating...">
          Create
        </Button>
      </Dialog.Footer>
    </>
  );
}
