import { Alert, AlertIndicator, Button, HStack } from '@chakra-ui/react';
import { FaArrowsRotate, FaTriangleExclamation } from 'react-icons/fa6';

export function ErrorComponent({ error }: { error: Error }) {
  return (
    <Alert.Root status="error">
      <Alert.Content display="flex" gap={4} flexDirection="column" alignItems="center">
        <AlertIndicator fontSize="5xl">
          <FaTriangleExclamation />
        </AlertIndicator>
        <Alert.Title fontSize="xl">Unexpected Error</Alert.Title>
        <Alert.Description fontSize="md" whiteSpace="pre-wrap">
          {error.message}
        </Alert.Description>
        <HStack>
          <Button onClick={() => location.reload()}>
            <FaArrowsRotate /> Reload
          </Button>
        </HStack>
      </Alert.Content>
    </Alert.Root>
  );
}
