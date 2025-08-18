import type { ComponentProps } from 'react';
import type { FieldValues, FormState } from 'react-hook-form';
import { Alert, Stack } from '@chakra-ui/react';

export function Form({
  formState,
  children,
  ...props
}: {
  formState?: FormState<FieldValues>;
} & ComponentProps<'form'>) {
  return (
    <Stack asChild>
      <form {...props}>
        {formState?.errors.root != null && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{formState.errors.root?.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        {children}
      </form>
    </Stack>
  );
}
