import type { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import type { PromiseResult } from '@/share/lib/result';
import { Form } from '@/share/ui/form';
import { LoginSchema } from '../models/schemas';

export function LoginForm({
  onSubmit,
  ...props
}: {
  onSubmit: (data: LoginSchema) => PromiseResult<unknown>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>) {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmit = form.handleSubmit(async data => {
    const submitResult = await onSubmit(data);
    if (submitResult.success) {
      return form.reset({ email: '' }, { keepValues: false });
    }

    if (submitResult.error.type === 'validation' && submitResult.error.issues != null) {
      Object.entries(submitResult.error.issues).map(([name, value]) =>
        form.setError(name as 'root', { message: Array.isArray(value) ? value.join(', ') : value }),
      );
    } else {
      form.setError('root', { message: submitResult.error.message });
    }
  });

  return (
    <Form formState={form.formState} onSubmit={handleSubmit} {...props}>
      <Field.Root invalid={form.formState.errors.email != null}>
        <Field.Label>E-mail</Field.Label>
        <Input autoComplete="email" placeholder="name@mail.com" type="email" {...form.register('email')} />
        <Field.ErrorText>{form.formState.errors.email?.message as string}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={form.formState.errors.password != null}>
        <Field.Label>Password</Field.Label>
        <Input autoComplete="current-password" placeholder="********" type="password" {...form.register('password')} />
        <Field.ErrorText>{form.formState.errors.password?.message as string}</Field.ErrorText>
      </Field.Root>
    </Form>
  );
}
