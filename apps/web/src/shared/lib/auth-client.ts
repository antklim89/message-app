import type { auth } from '@message-app/auth';
import { env } from '@message-app/env/web';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: new URL('/api/auth', env.VITE_SERVER_URL).toString(),
  plugins: [inferAdditionalFields<typeof auth>()],
});
