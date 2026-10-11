import { withForm } from '@message-app/ui/lib/form';

import { registerFormOptions } from '../models/form-options';

export const RegisterForm = withForm({
  ...registerFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          {/* <form.AppField name="displayname">
            {field => <field.FormInput autoFocus autoComplete="displayname" placeholder="John" label="Display name" />}
          </form.AppField> */}
          <form.AppField name="username">
            {field => <field.FormInput autoFocus autoComplete="username" placeholder="John" label="Username" />}
          </form.AppField>
          <form.AppField name="email">
            {field => <field.FormInput autoComplete="email" placeholder="name@mail.com" label="E-mail" />}
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
          <form.AppField name="repeat">
            {field => (
              <field.FormInput
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
