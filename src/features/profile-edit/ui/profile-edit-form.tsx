import { formOptions, revalidateLogic } from '@tanstack/react-form';

import { withForm } from '@/shared/lib/react-form';
import { ProfileEditSchema } from '../model/schemas';

export const profileEditFormOptions = formOptions({
  validators: {
    onDynamic: ProfileEditSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: undefined as undefined | ProfileEditSchema,
});

export const ProfileEditForm = withForm({
  ...profileEditFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="username">{field => <field.InputField label="Username" autoFocus />}</form.AppField>
          <form.AppField name="bio">{field => <field.TextareaField label="Bio" autoFocus autoresize />}</form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
