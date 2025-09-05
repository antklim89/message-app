import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { type z } from 'zod/v4-mini';

import { withForm } from '@/shared/lib/react-form';
import { SearchSchema } from '../model/schemas';

export const searchFormOptions = formOptions({
  validators: {
    onDynamic: SearchSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: undefined as undefined | z.infer<typeof SearchSchema>,
});

export const SearchForm = withForm({
  ...searchFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="search">{field => <field.InputField placeholder="You search term..." />}</form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
