import type { ComponentProps } from 'react';
import { Field, Input, type InputProps, Stack, Textarea, type TextareaProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react/button';
import { createFormHookContexts } from '@tanstack/react-form';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export function printError(
  error?:
    | undefined
    | null
    | boolean
    | string
    | string[]
    | { message?: string }
    | Array<{ message?: string } | undefined>,
): string | null {
  if (error == null) return null;
  if (typeof error === 'string') return error;
  if (error === true) return 'Unexpected error.';
  if (Array.isArray(error)) {
    return error
      .map(i => printError(i))
      .filter(Boolean)
      .join('\n');
  }
  if (typeof error === 'object' && 'message' in error) return printError(error.message);
  return null;
}

export function FormInput({ label, ...props }: InputProps & { label?: string }) {
  const field = useFieldContext<string>();

  return (
    <Field.Root invalid={!field.state.meta.isValid}>
      {label ? <Field.Label htmlFor={field.name + field.form.formId}>{label}</Field.Label> : null}
      <Input
        aria-invalid={!field.state.meta.isValid}
        id={field.name + field.form.formId}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        {...props}
      />
      <Field.ErrorText whiteSpace="pre-wrap">{printError(field.state.meta.errors)}</Field.ErrorText>
    </Field.Root>
  );
}

export function FormTextarea({ label, ...props }: TextareaProps & { label?: string }) {
  const field = useFieldContext<string>();

  return (
    <Field.Root invalid={!field.state.meta.isValid}>
      {label ? <Field.Label htmlFor={field.name + field.form.formId}>{label}</Field.Label> : null}
      <Textarea
        aria-invalid={!field.state.meta.isValid}
        id={field.name + field.form.formId}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        {...props}
      />

      <Field.ErrorText>{printError(field.state.meta.errors)}</Field.ErrorText>
    </Field.Root>
  );
}

export function Form({ children, className, ...props }: ComponentProps<'form'>) {
  const form = useFormContext();

  return (
    <Stack
      asChild
      width="full"
      gap="6"
      id={form.formId}
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form {...props}>{children}</form>
    </Stack>
  );
}

export function FormSubmitButton({
  onSubmit,
  children,
  submittingText,
  ...props
}: ComponentProps<typeof Button> & { submittingText?: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button
          loading={isSubmitting}
          loadingText={submittingText}
          type="submit"
          form={form.formId}
          disabled={isSubmitting}
          {...props}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
