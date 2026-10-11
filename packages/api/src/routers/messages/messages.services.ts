import { db, messageDraftTable, messageTable } from '@message-app/db';
import type { MessageCreateType, MessageDraftUpdateType } from '@message-app/entities/messages';
import { s3Client } from '@message-app/s3';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';

import { convertImage, convertVideo } from './messages.utils';

export async function messageGetDraftService({ authorId, answerId }: { authorId: string; answerId?: string }) {
  const foundDraft = await db.query.messageDraftTable.findFirst({
    where: { authorId, answerId },
  });

  if (foundDraft) return foundDraft;

  const [insertedDraft] = await db
    .insert(messageTable)
    .values({
      authorId,
      body: {
        root: { children: [], direction: 'ltr', format: 'start', indent: 0, type: 'root', version: 0 },
      },
      publishedAt: new Date().toISOString(),
    })
    .returning();

  if (!insertedDraft) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to get the draft message.',
    });
  }

  return insertedDraft;
}

export async function messageUpdateDraftService({
  id,
  authorId,
  input,
}: {
  id: string;
  authorId: string;
  input: MessageDraftUpdateType;
}) {
  const [updatedDraft] = await db
    .update(messageDraftTable)
    .set({ body: input.body })
    .where(and(eq(messageDraftTable.authorId, authorId), eq(messageDraftTable.id, id)))
    .returning({ id: messageDraftTable.id });

  if (!updatedDraft) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to update the draft message.',
    });
  }

  return updatedDraft;
}

export async function messageUploadImageService({
  imageStream,
  authorId,
}: {
  imageStream: ReadableStream;
  authorId: string;
}) {
  const pathId = `${authorId}/images/${crypto.randomUUID()}`;

  try {
    await convertImage(imageStream, pathId);
    return pathId;
  } catch {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Failed to upload image.',
    });
  }
}

export async function messageUploadVideoService({
  videoStream,
  authorId,
}: {
  videoStream: ReadableStream;
  authorId: string;
}) {
  const pathId = `${authorId}/videos/${crypto.randomUUID()}.webm`;

  try {
    await convertVideo(videoStream, pathId);
    return pathId;
  } catch {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Failed to upload video.',
    });
  }
}

export async function messagePublishDraftService({
  authorId,
  answerId,
  input,
}: {
  authorId: string;
  answerId?: string;
  input: MessageCreateType;
}) {
  return db.transaction(async tx => {
    // if (input.embed?.type === 'images') {
    //   await Promise.all(input.embed.imagesSrc.map(imageSrc => s3Client.delete(imageSrc)) )
    //   s3Client.
    // }

    const [newMessage] = await tx
      .insert(messageTable)
      .values({
        authorId,
        answerId,
        body: input.body,
        embed: input.embed,
        publishedAt: new Date().toISOString(),
      })
      .returning();

    if (!newMessage) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to publish the message.',
      });
    }

    return newMessage;
  });
}
