import { formOptions, revalidateLogic } from '@tanstack/react-form';

import { withForm } from '@/share/lib/react-form';
import { LoginSchema } from '../models/schemas';

export const loginFormOptions = formOptions({
  validators: {
    onDynamic: LoginSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: {
    email: '',
    password: '',
  },
});

export const LoginForm = withForm({
  ...loginFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="email">
            {field => <field.InputField autoFocus autoComplete="email" placeholder="name@mail.com" label="E-mail" />}
          </form.AppField>
          <form.AppField name="password">
            {field => (
              <field.InputField
                autoComplete="current-password"
                placeholder="********"
                label="Password"
                type="password"
              />
            )}
          </form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
