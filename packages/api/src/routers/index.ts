import { publicProcedure, router } from '@message-app/api/init';

import { messagesRoute } from './messages/messages.routes';
import { siteMetadataRouter } from './site-metadata/site-metadata.routes';
import { userRouter } from './users/users.routes';

export const appRouter = router({
  healthCheck: publicProcedure.query(() => ({ message: 'ok' })),
  user: userRouter,
  siteMetadata: siteMetadataRouter,
  messages: messagesRoute,
});
export type AppRouter = typeof appRouter;
