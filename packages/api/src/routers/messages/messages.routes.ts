import { protectedProcedure, router } from '@message-app/api/init';
import { MessageDraftUpdateSchema } from '@message-app/entities/messages';
import { octetInputParser } from '@trpc/server/http';
import { z } from 'zod/v4-mini';

import {
  messageGetDraftService,
  // messagePublishDraftService,
  messageUpdateDraftService,
  messageUploadTempFileService,
} from './messages.services';

export const messagesRoute = router({
  getDraft: protectedProcedure
    .input(z.object({ answerId: z.optional(z.uuid()) }))
    .mutation(async ({ ctx: { user }, input: { answerId } }) => {
      const result = await messageGetDraftService({ authorId: user.id, answerId });
      return result;
    }),
  updateDraft: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .input(MessageDraftUpdateSchema)
    .mutation(async ({ ctx: { user }, input: { id, ...input } }) => {
      const result = await messageUpdateDraftService({ id, authorId: user.id, input });
      return result;
    }),
  uploadTempFile: protectedProcedure.input(octetInputParser).mutation(async ({ ctx: { user }, input }) => {
    const imageId = await messageUploadTempFileService({ fileStream: input, authorId: user.id });
    return imageId;
  }),
  // publishDraft: protectedProcedure
  //   .input(z.object({ answerId: z.optional(z.uuid()) }))
  //   .mutation(async ({ ctx: { user }, input: { answerId } }) => {
  //     const result = await messagePublishDraftService({ authorId: user.id, answerId });
  //     return result;
  //   }),
});

export type AppRouter = typeof messagesRoute;
