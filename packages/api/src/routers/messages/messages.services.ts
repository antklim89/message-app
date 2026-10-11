import { db, messageTable } from '@message-app/db';
import type { MessageCreateType } from '@message-app/entities/messages';
import { TRPCError } from '@trpc/server';

export async function messageCreateService({ input, authorId }: { input: MessageCreateType; authorId: string }) {
  const [result] = await db
    .insert(messageTable)
    .values({
      body: input.body,
      answerId: input.answerId,
      authorId,
    })
    .returning({ id: messageTable.id });

  if (!result) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create the message.',
    });
  }

  return result;
}
