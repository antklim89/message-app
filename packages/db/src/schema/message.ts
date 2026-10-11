import type { MessageType } from '@message-app/entities/messages';
import { sql } from 'drizzle-orm';
import { type AnyPgColumn, jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { userTable } from './auth';

const baseColumns = {
  id: uuid().default(sql`uuidv7()`).primaryKey(),
  body: jsonb().$type<MessageType['body']>().notNull(),
  answerId: uuid().references((): AnyPgColumn => messageTable.id, { onDelete: 'cascade' }),
  authorId: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
};

export const messageTable = pgTable('message', {
  ...baseColumns,
  embed: jsonb().$type<MessageType['embed']>(),
  publishedAt: timestamp({ mode: 'string', withTimezone: true }).notNull(),
});

export const messageDraftTable = pgTable('message_draft', {
  ...baseColumns,
  updatedAt: timestamp({ mode: 'string', withTimezone: true })
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
});
