import { resolve } from 'node:path';
import { drizzle, type PgliteDatabase } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';

import { relations } from '../src/relations';

export const testDb: PgliteDatabase<typeof relations> = drizzle({ relations });

export async function migrateTestDb() {
  await migrate(testDb, { migrationsFolder: resolve(import.meta.dirname, '../migrations') });
}
