import type { ReactNode } from 'react';
import { EmptyState, VStack } from '@chakra-ui/react';
import { FaExclamation } from 'react-icons/fa6';

export function Empty({ title, message, icon }: { title: string; message: string; icon?: ReactNode }) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>{icon || <FaExclamation />}</EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{message}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
