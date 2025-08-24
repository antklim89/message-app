import { type ReactNode } from 'react';
import { Field as ChakraField } from '@chakra-ui/react';

import { useFieldContext } from '@/share/lib/react-form';

export function BaseField({ label, children }: { label?: string; children: ReactNode }) {
  const field = useFieldContext<string>();
  const isInvalid = !field.state.meta.isValid;
  const errorMessage = field.state.meta.errors.map(err => err.message ?? err).join(',');

  return (
    <ChakraField.Root invalid={isInvalid}>
      {label != null && <ChakraField.Label>{label}</ChakraField.Label>}
      {children}
      <ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
    </ChakraField.Root>
  );
}
