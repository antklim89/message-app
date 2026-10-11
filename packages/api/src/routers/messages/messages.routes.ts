import { protectedProcedure, router } from '@message-app/api/init';
import { MessageCreateSchema } from '@message-app/entities/messages';

import { messageCreateService } from './messages.services';
import { validateMessageBody } from './messages.utils';

export const messagesRoute = router({
  create: protectedProcedure.input(MessageCreateSchema).mutation(async ({ input, ctx }) => {
    const user = ctx.session.user;
    await validateMessageBody(input.body);

    const result = await messageCreateService({ input, authorId: user.id });
    return result;
  }),
});

export type AppRouter = typeof messagesRoute;
