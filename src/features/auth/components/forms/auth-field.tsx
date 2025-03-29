import type { InputProps } from '@chakra-ui/react';
import { Field, Input } from '@chakra-ui/react';
import type {
  FieldPath,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';


export function AuthFormField<T extends FieldValues, K extends FieldPath<T>>({
  form,
  name,
  label,
  ...props
}: { form: UseFormReturn<T>; name: K; label: string } & Omit<InputProps, 'form' | 'label'>) {
  return (
    <Field.Root invalid={form.formState.errors[name] != null}>
      <Field.Label>{label}</Field.Label>
      <Input {...props} {...form.register(name)} />
      <Field.ErrorText>{form.formState.errors[name]?.message as string}</Field.ErrorText>
    </Field.Root>
  );
}
