import type { MessageCreateType } from '@message-app/entities/messages';
import { sql } from 'drizzle-orm';
import { type AnyPgColumn, jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { userTable } from './auth';

export const messageTable = pgTable('message', {
  id: uuid().default(sql`uuidv7()`).primaryKey(),
  body: jsonb().$type<MessageCreateType['body']>().notNull(),

  answerId: uuid().references((): AnyPgColumn => messageTable.id, { onDelete: 'cascade' }),
  authorId: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),

  createdAt: timestamp({ mode: 'string', withTimezone: true }).defaultNow().notNull(),
});
