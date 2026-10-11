import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';
import {
  MAX_IMAGE_HEIGHT,
  MAX_IMAGE_WIDTH,
  MAX_MESSAGE_BODY_LENGTH,
  type MessageCreateType,
  MIN_MESSAGE_BODY_LENGTH,
} from '@message-app/entities/messages';
import { $getRoot, AppExtension, createHeadlessEditor } from '@message-app/rich-text';
import { s3Client } from '@message-app/s3';
import { TRPCError } from '@trpc/server';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

export async function validateMessageBody(body: MessageCreateType['body']) {
  try {
    const editor = createHeadlessEditor(AppExtension.config);
    const editorState = editor.parseEditorState(body);
    editor.setEditorState(editorState);

    const length = editor.getEditorState().read(() => $getRoot().getTextContentSize());

    if (length < MIN_MESSAGE_BODY_LENGTH) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: `Message body too short. Min allowed is ${MIN_MESSAGE_BODY_LENGTH}`,
      });
    }
    if (length > MAX_MESSAGE_BODY_LENGTH) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: `Message body too long. Max allowed is ${MAX_MESSAGE_BODY_LENGTH}`,
      });
    }
  } catch {
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Invalid message body content.',
    });
  }
}

export async function convertImage(imageStream: ReadableStream, pathId: string) {
  const s3FileWriter = s3Client.file(pathId, { bucket: 'temp' }).writer();
  try {
    const resizeStream = sharp().resize({ width: MAX_IMAGE_WIDTH, height: MAX_IMAGE_HEIGHT, fit: 'cover' }).webp();

    await pipeline(imageStream, resizeStream, async function* (source) {
      for await (const chunk of source) yield await s3FileWriter.write(chunk);
    });

    return pathId;
  } catch (error) {
    await fs.rm(pathId, { force: true, recursive: true }).catch(() => null);
    throw error;
  } finally {
    await s3FileWriter.end();
  }
}

export async function convertVideo(videoStream: ReadableStream, pathId: string) {
  const tmpPath = path.resolve(os.tmpdir(), 'message_app', 'temp', pathId);

  await Bun.write(tmpPath, videoStream);

  if (!ffmpegPath) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Can't convert video." });
  const { stdout, exited } = Bun.spawn(
    [ffmpegPath, '-i', tmpPath, '-f', 'webm', '-c:v', 'libvpx-vp9', '-c:a', 'libopus', 'pipe:1'],
    {
      stdout: 'pipe',
      stderr: 'pipe',
    },
  );

  const s3FileWriter = s3Client.file(pathId, { bucket: 'temp' }).writer();
  await pipeline(stdout, async function* (source) {
    for await (const chunk of source) {
      yield await s3FileWriter.write(chunk);
    }
  });
  await s3FileWriter.end();
  void Bun.file(tmpPath).delete();

  const exitCode = await exited;

  if (exitCode !== 0) {
    await fs.rm(pathId, { force: true, recursive: true }).catch(() => null);
    throw new Error('Failed to upload the video');
  }
}
