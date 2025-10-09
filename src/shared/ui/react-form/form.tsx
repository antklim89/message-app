import type { ComponentProps } from 'react';
import { Alert, Heading, Stack } from '@chakra-ui/react';

import { useFormContext } from '@/shared/lib/react-form';
import { identifyError } from '@/shared/lib/utils';

export function Form({ onSubmit, children, ...props }: ComponentProps<'form'>) {
  const form = useFormContext();

  return (
    <Stack asChild gap={4} width="full">
      <form
        id={form.formId}
        {...props}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Subscribe selector={state => identifyError(state.errorMap.onSubmit)}>
          {error =>
            error != null && (
              <Alert.Root status="error" display="flex" flexDirection="row" alignItems="center" gap={4}>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title asChild>
                    <Heading fontSize="xl" as="h4">
                      Form Error
                    </Heading>
                  </Alert.Title>
                  <Alert.Description whiteSpace="pre-wrap">{error}</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            )
          }
        </form.Subscribe>
        {children}
      </form>
    </Stack>
  );
}
