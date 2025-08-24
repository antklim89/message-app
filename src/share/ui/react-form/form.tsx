import type { ComponentProps } from 'react';
import { Stack } from '@chakra-ui/react';

import { useFormContext } from '@/share/lib/react-form';

export function Form({ onSubmit, children, ...props }: ComponentProps<'form'>) {
  const form = useFormContext();
  return (
    <Stack asChild gap={4}>
      <form
        {...props}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {children}
      </form>
    </Stack>
  );
}
