import { useForm } from 'react-hook-form';
import { Alert, Button, Field, Flex, Input, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import type { PromiseResult } from '@/lib/result';
import { MessageEditSchema } from '../../schemas';

export function EditMessage({ onSubmit }: { onSubmit: (data: MessageEditSchema) => PromiseResult<unknown> }) {
  const form = useForm<MessageEditSchema>({
    resolver: zodResolver(MessageEditSchema),
  });

  const handleSubmit = form.handleSubmit(async data => {
    const { type, error } = await onSubmit(data);
    if (type === 'error') form.setError('root', { message: error.message });
    else form.reset();
  });

  return (
    <Flex
      as="form"
      onKeyDown={e => {
        e.key === 'Enter' && e.ctrlKey && handleSubmit(e);
      }}
      flexDirection="column"
      p={8}
      gap={4}
      onSubmit={handleSubmit}
    >
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

      <Button loading={form.formState.isSubmitting} textTransform="uppercase" type="submit">
        Submit
      </Button>
    </Flex>
  );
}
