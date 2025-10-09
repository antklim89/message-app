import type { ComponentProps } from 'react';
import { formOptions, revalidateLogic } from '@tanstack/react-form';

import { withForm } from '@/shared/lib/react-form';
import { ProfileEditSchema } from '../model/schemas';

export const profileEditFormOptions = formOptions({
  validators: {
    onDynamic: ProfileEditSchema,
    onSubmit: ProfileEditSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: undefined as undefined | ProfileEditSchema,
});

export const ProfileEditForm = withForm({
  ...profileEditFormOptions,
  props: {} as ComponentProps<'form'>,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="displayname">{field => <field.InputField label="Displayname" />}</form.AppField>
          <form.AppField name="bio">{field => <field.TextareaField label="Bio" autoresize />}</form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
