import { type AnyPgColumn, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { userTable } from './auth';
import { messageTable } from './message';

export const likeTable = pgTable(
  'like',
  {
    answerId: uuid()
      .notNull()
      .references((): AnyPgColumn => messageTable.id, { onDelete: 'cascade' }),

    authorId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
  },
  table => [uniqueIndex('like_answerId_authorId_idx').on(table.answerId, table.authorId)],
);
