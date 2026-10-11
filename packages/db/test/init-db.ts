import { db, messageTable } from '@message-app/db';
import { beforeEach, vi } from 'vitest';

import { migrateTestDb } from './test-db';

await migrateTestDb();

vi.mock('@message-app/db', async importOriginal => {
  const { testDb } = await import('./test-db');
  const actual = (await importOriginal()) as typeof import('@message-app/db');
  return { isMock: true, ...actual, db: testDb };
});

beforeEach(async () => {
  await db.delete(messageTable);
});
