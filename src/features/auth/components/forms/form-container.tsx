import { Flex } from '@chakra-ui/react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';


export function FormContainer<T extends FieldValues>({
  children,
  form,
  onSubmit,
}: {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}) {
  const handleSubmit = form.handleSubmit(onSubmit);
  return (
    <FormProvider {...form}>
      <Flex
        as="form"
        flexDirection="column"
        gap={4}
        onSubmit={handleSubmit}
      >
        {children}
      </Flex>
    </FormProvider>
  );
}
