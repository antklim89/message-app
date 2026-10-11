import { type AnyPgColumn, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { userTable } from './auth';
import { messageTable } from './message';

export const favoriteTable = pgTable(
  'favorite',
  {
    messageId: uuid()
      .notNull()
      .references((): AnyPgColumn => messageTable.id, { onDelete: 'cascade' }),

    authorId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
  },
  table => [uniqueIndex('favorite_messageId_authorId_idx').on(table.messageId, table.authorId)],
);
