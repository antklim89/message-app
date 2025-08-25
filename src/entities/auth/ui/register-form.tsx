import { formOptions, revalidateLogic } from '@tanstack/react-form';

import { withForm } from '@/share/lib/react-form';
import { RegisterSchema } from '../models/schemas';

export const registerFormOptions = formOptions({
  validators: {
    onDynamic: RegisterSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: {
    username: '',
    email: '',
    password: '',
    repeat: '',
  },
});

export const RegisterForm = withForm({
  ...registerFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="username">
            {field => <field.InputField autoFocus autoComplete="username" placeholder="John" label="Username" />}
          </form.AppField>
          <form.AppField name="email">
            {field => <field.InputField autoComplete="email" placeholder="name@mail.com" label="E-mail" />}
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
          <form.AppField name="repeat">
            {field => (
              <field.InputField
                autoComplete="new-password"
                placeholder="********"
                label="Repeat Password"
                type="password"
              />
            )}
          </form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
