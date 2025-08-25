import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Toaster } from '@/shared/ui/toaster';
import { App } from './app';
import { ChakraProvider } from './providers/chakra-provider';
import { ReactQueryProvider } from './providers/react-query';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <ChakraProvider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
      <Toaster />
    </ChakraProvider>
  </StrictMode>,
);
