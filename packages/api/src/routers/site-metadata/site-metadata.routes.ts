import { publicProcedure, router } from '@message-app/api/init';
import { z } from 'zod/v4-mini';

import { getMetadata } from './site-metadata.services';

export const siteMetadataRouter = router({
  getSiteMetadata: publicProcedure.input(z.object({ url: z.string().check(z.httpUrl()) })).query(async ({ input }) => {
    const metadata = await getMetadata({ url: input.url });
    return metadata;
  }),
});

export type AppRouter = typeof siteMetadataRouter;
