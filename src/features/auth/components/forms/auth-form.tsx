import { useEffect } from 'react';
import { type FieldErrors, useForm } from 'react-hook-form';
import { Alert, Button, Field, Flex, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema, RegisterSchema } from '@/features/auth/schemas';
import type { PromiseResult } from '@/lib/result';

export function AuthForm({
  onSubmit,
  type = 'login',
}: {
  onSubmit: (data: LoginSchema | RegisterSchema) => PromiseResult<unknown>;
  type?: 'login' | 'register';
}) {
  const form = useForm<LoginSchema | RegisterSchema>({
    resolver: zodResolver(type === 'login' ? LoginSchema : RegisterSchema),
  });

  const errors = form.formState.errors as FieldErrors<LoginSchema & RegisterSchema>;

  useEffect(() => {
    const { unsubscribe } = form.watch((_, { name, type }) => {
      if (type === 'change' && name === 'password' && form.formState.isSubmitted) {
        form.trigger('repeat');
      }
    });

    return unsubscribe;
  }, [form]);

  const handleSubmit = form.handleSubmit(async data => {
    const submitResult = await onSubmit(data);
    if (submitResult.type === 'success') {
      return form.reset({ email: '' }, { keepValues: false });
    }

    if (submitResult.error.type === 'validation') {
      Object.entries(submitResult.error.errors).map(([name, value]) =>
        form.setError(name as 'root', { message: value }),
      );
    } else {
      form.setError('root', { message: submitResult.error.message });
    }
  });

  return (
    <Flex as="form" flexDirection="column" gap={4} onSubmit={handleSubmit}>
      {form.formState.errors.root != null && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Failed to {type}</Alert.Title>
            <Alert.Description>{form.formState.errors.root.message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {type === 'register' && (
        <Field.Root invalid={errors.username != null}>
          <Field.Label>Username</Field.Label>
          <Input autoComplete="username" placeholder="Enter your username" {...form.register('username')} />
          <Field.ErrorText>{errors.username?.message as string}</Field.ErrorText>
        </Field.Root>
      )}

      <Field.Root invalid={errors.email != null}>
        <Field.Label>E-mail</Field.Label>
        <Input autoComplete="email" placeholder="Enter your email address" type="email" {...form.register('email')} />
        <Field.ErrorText>{errors.email?.message as string}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={errors.password != null}>
        <Field.Label>Password</Field.Label>
        <Input
          autoComplete={type === 'register' ? 'new-password' : 'current-password'}
          placeholder="Enter your password"
          type="password"
          {...form.register('password')}
        />
        <Field.ErrorText>{errors.password?.message as string}</Field.ErrorText>
      </Field.Root>

      {type === 'register' && (
        <Field.Root invalid={errors.repeat != null}>
          <Field.Label>Password repeat</Field.Label>
          <Input
            autoComplete="new-password"
            placeholder="Repeat your password"
            type="password"
            {...form.register('repeat')}
          />
          <Field.ErrorText>{errors.repeat?.message as string}</Field.ErrorText>
        </Field.Root>
      )}

      <Button textTransform="uppercase" loading={form.formState.isSubmitting} type="submit">
        {type}
      </Button>
    </Flex>
  );
}
