import { type ComponentProps, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import type { PromiseResult } from '@/share/lib/result';
import { Form } from '@/share/ui/form';
import { RegisterSchema } from '../models/schemas';

export function RegisterForm({
  onSubmit,
  ...props
}: {
  onSubmit: (data: RegisterSchema) => PromiseResult<unknown>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>) {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (_, { name, type }) => {
      if (type === 'change' && name === 'password' && form.formState.isSubmitted) {
        await form.trigger('repeat');
      }
    });
    return unsubscribe;
  }, [form]);

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
    <Form onSubmit={handleSubmit} {...props}>
      <Field.Root invalid={form.formState.errors.username != null}>
        <Field.Label>Username</Field.Label>
        <Input autoComplete="username" placeholder="Name" {...form.register('username')} />
        <Field.ErrorText>{form.formState.errors.username?.message as string}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={form.formState.errors.email != null}>
        <Field.Label>E-mail</Field.Label>
        <Input autoComplete="email" placeholder="example@mail.ru" type="email" {...form.register('email')} />
        <Field.ErrorText>{form.formState.errors.email?.message as string}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={form.formState.errors.password != null}>
        <Field.Label>Password</Field.Label>
        <Input autoComplete="new-password" placeholder="********" type="password" {...form.register('password')} />
        <Field.ErrorText>{form.formState.errors.password?.message as string}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={form.formState.errors.repeat != null}>
        <Field.Label>Repeat password</Field.Label>
        <Input autoComplete="new-password" placeholder="********" type="password" {...form.register('repeat')} />
        <Field.ErrorText>{form.formState.errors.repeat?.message as string}</Field.ErrorText>
      </Field.Root>
    </Form>
  );
}
