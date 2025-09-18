import { formOptions, revalidateLogic } from '@tanstack/react-form';

import { ProfileSelect } from '@/entities/profiles';
import { withForm } from '@/shared/lib/react-form';
import { MessageEditSchema } from '../model/schemas';

export const messageEditFormOptions = formOptions({
  validators: {
    onDynamic: MessageEditSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: { body: '' },
});

export const MessageEditForm = withForm({
  ...messageEditFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="body">
            {field => (
              <>
                <field.TextareaField
                  autoFocus
                  onKeyDown={e => {
                    if (e.ctrlKey && e.key === 'Enter') form.handleSubmit();
                  }}
                  autoresize
                  placeholder="Enter you message"
                />
              </>
            )}
          </form.AppField>

          <ProfileSelect
            onSelect={v =>
              form
                .getFieldInfo('body')
                .instance?.handleChange(`${form.getFieldValue('body').trim()} @${v.username}[${v.id}]`)
            }
          />
        </form.Form>
      </form.AppForm>
    );
  },
});
