import { defineRelations } from 'drizzle-orm';

import * as schema from './schema';

export const relations = defineRelations(schema, r => ({
  userTable: {
    favorites: r.many.favoriteTable({
      from: r.userTable.id,
      to: r.favoriteTable.authorId,
    }),
    followers: r.many.followerTable({
      from: r.userTable.id,
      to: r.followerTable.followerId,
    }),
  },
  accountTable: {
    user: r.one.userTable({
      from: r.accountTable.userId,
      to: r.userTable.id,
    }),
  },
  messageTable: {
    user: r.one.userTable({
      from: r.messageTable.authorId,
      to: r.userTable.id,
    }),
  },
}));
