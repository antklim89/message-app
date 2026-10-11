import type { ComponentProps } from 'react';
import { withForm } from '@message-app/ui/lib/form';

import { loginFormOptions } from '../models/form-options';

export const LoginForm = withForm({
  ...loginFormOptions,
  props: {} as ComponentProps<'form'>,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="email">
            {field => <field.FormInput autoFocus autoComplete="email" placeholder="name@mail.com" label="E-mail" />}
          </form.AppField>
          <form.AppField name="password">
            {field => (
              <field.FormInput
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
