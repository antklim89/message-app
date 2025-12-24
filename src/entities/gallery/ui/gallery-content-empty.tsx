import { EmptyState, EmptyStateIndicator } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa6';

export function GalleryContentEmpty() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyStateIndicator>
          <FaImage />
        </EmptyStateIndicator>
        <EmptyState.Description>The gallery is empty</EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
