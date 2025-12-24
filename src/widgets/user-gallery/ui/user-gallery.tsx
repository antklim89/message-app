import type { ReactNode } from 'react';
import { Card } from '@chakra-ui/react';

export function UserGallery({ content, uploadButton }: { uploadButton: ReactNode; content: ReactNode }) {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title textAlign="center" fontSize="3xl">
          Gallery
        </Card.Title>
        {uploadButton}
      </Card.Header>
      <Card.Body>{content}</Card.Body>
    </Card.Root>
  );
}
