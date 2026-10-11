import type { User } from '@message-app/auth';

import { appRouter } from '../src/index';
import { t } from '../src/init';

export const createCallerFactory = t.createCallerFactory(appRouter);

export function testTrpc(data: { user: User } | null) {
  return createCallerFactory({ user: data?.user || null });
}
