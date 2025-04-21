import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { ChakraProvider } from '@/components/providers/chakra-provider';
import { App } from './app';
import { ReactQueryProvider } from './components/providers/react-query';
import { Toaster } from './components/ui/toaster';

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
