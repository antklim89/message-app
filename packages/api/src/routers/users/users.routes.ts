import { publicProcedure, router } from '@message-app/api/init';
import { db } from '@message-app/db';
import { z } from 'zod/v4-mini';

export const userRouter = router({
  getUsers: publicProcedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return db.query.userTable.findMany({
      limit: 10,
      where: {
        name: {
          ilike: `%${input.name}%`,
        },
      },
    });
  }),
});
export type AppRouter = typeof userRouter;
