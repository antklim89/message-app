import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { db, messageDraftTable, messageTable } from '@message-app/db';
import {
  MAX_IMAGE_HEIGHT,
  MAX_IMAGE_WIDTH,
  type MessageCreateType,
  type MessageDraftUpdateType,
} from '@message-app/entities/messages';
import { deleteFile, uploadFileStream } from '@message-app/s3';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

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

export async function messageUploadTempFileService({
  fileStream,
  authorId,
}: {
  fileStream: ReadableStream;
  authorId: string;
}) {
  const key = `temp/${authorId}/${crypto.randomUUID()}`;

  try {
    await uploadFileStream(key, fileStream);
    return key;
  } catch {
    await deleteFile(key);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to upload image.',
    });
  }
}

// export async function messageUploadImageService({
//   imageStream,
//   authorId,
// }: {
//   imageStream: ReadableStream;
//   authorId: string;
// }) {
//   const key = `${authorId}/images/${crypto.randomUUID()}`;

//   try {
//     const resizeStream = sharp().resize({ width: MAX_IMAGE_WIDTH, height: MAX_IMAGE_HEIGHT, fit: 'cover' }).webp();
//     await uploadFileStream(key, imageStream, resizeStream);

//     return key;
//   } catch {
//     await deleteFile(key);
//     throw new TRPCError({
//       code: 'BAD_REQUEST',
//       message: 'Failed to upload image.',
//     });
//   }
// }

// export async function messageUploadVideoService({
//   videoStream,
//   authorId,
// }: {
//   videoStream: ReadableStream;
//   authorId: string;
// }) {
//   const key = `${authorId}/videos/${crypto.randomUUID()}.webm`;
//   const tmpPath = path.resolve(os.tmpdir(), 'message_app', 'temp', key);

//   try {
//     await Bun.write(tmpPath, videoStream);

//     if (!ffmpegPath) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Can't convert video." });
//     const { stdout, exited } = Bun.spawn(
//       [ffmpegPath, '-i', tmpPath, '-f', 'webm', '-c:v', 'libvpx-vp9', '-c:a', 'libopus', 'pipe:1'],
//       {
//         stdout: 'pipe',
//         stderr: 'pipe',
//       },
//     );

//     await uploadFileStream(key, stdout);

//     if ((await exited) !== 0) {
//       throw new TRPCError({
//         code: 'INTERNAL_SERVER_ERROR',
//         message: 'Failed to upload video.',
//       });
//     }

//     return key;
//   } catch {
//     await deleteFile(key);
//     throw new TRPCError({
//       code: 'BAD_REQUEST',
//       message: 'Failed to upload video.',
//     });
//   } finally {
//     void fs.rm(tmpPath, { force: true, recursive: true });
//   }
// }

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
