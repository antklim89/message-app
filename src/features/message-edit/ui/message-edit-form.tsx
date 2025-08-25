import { formOptions, revalidateLogic } from '@tanstack/react-form';

import { withForm } from '@/shared/lib/react-form';
import { MessageEditSchema } from '../model/schemas';

export const messageEditFormOptions = formOptions({
  validators: {
    onDynamic: MessageEditSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: undefined as undefined | { body: string },
});

export const MessageEditForm = withForm({
  ...messageEditFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="body">
            {field => (
              <field.TextareaField
                autoFocus
                onKeyDown={e => {
                  if (e.ctrlKey && e.key === 'Enter') form.handleSubmit();
                }}
                autoresize
                placeholder="Enter you message"
              />
            )}
          </form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
