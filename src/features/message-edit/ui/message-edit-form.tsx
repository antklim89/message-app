import type { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Field, Input, Stack, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import type { PromiseResult } from '@/share/lib/result';
import { MessageEditSchema } from '../model/schemas';

export function MessageEditForm({
  onSubmit,
  values,
  children,
  ...props
}: {
  onSubmit: (data: MessageEditSchema) => PromiseResult<unknown>;
  values?: MessageEditSchema;
  children?: React.ReactNode;
} & Omit<ComponentProps<'form'>, 'onSubmit'>) {
  const form = useForm<MessageEditSchema>({
    resolver: zodResolver(MessageEditSchema),
    values,
  });

  const handleSubmit = form.handleSubmit(async data => {
    const { fail, error } = await onSubmit(data);
    if (fail) form.setError('root', { message: error.message });
    else form.reset();
  });

  return (
    <Stack
      asChild
      onKeyDown={e => {
        e.key === 'Enter' && e.ctrlKey && handleSubmit(e);
      }}
    >
      <form onSubmit={handleSubmit} {...props}>
        {form.formState.errors.root != null && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{form.formState.errors.root.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <Field.Root invalid={form.formState.errors.title != null}>
          <Field.Label>Title</Field.Label>
          <Input placeholder="Enter title of the message" {...form.register('title')} />
          <Field.ErrorText>{form.formState.errors.title?.message as string}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={form.formState.errors.body != null}>
          <Field.Label>Message</Field.Label>
          <Textarea autoresize placeholder="Enter you message" {...form.register('body')} />
          <Field.ErrorText>{form.formState.errors.body?.message as string}</Field.ErrorText>
        </Field.Root>

        {children}
      </form>
    </Stack>
  );
}
