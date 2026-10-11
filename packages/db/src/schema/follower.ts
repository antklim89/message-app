import { type AnyPgColumn, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { userTable } from './auth';
import { messageTable } from './message';

export const followerTable = pgTable(
  'follower',
  {
    messageId: uuid()
      .notNull()
      .references((): AnyPgColumn => messageTable.id, { onDelete: 'cascade' }),

    followerId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
  },
  table => [uniqueIndex('follower_messageId_followerId_idx').on(table.messageId, table.followerId)],
);
