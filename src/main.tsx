import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from '@/components/ui/provider';
import { App } from './app';
import ReactQuery from './components/providers/react-query';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <Provider>
      <ReactQuery>
        <App />
      </ReactQuery>
    </Provider>
  </StrictMode>,
);
