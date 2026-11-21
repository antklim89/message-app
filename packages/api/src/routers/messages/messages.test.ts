import { createReadStream } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Readable } from 'node:stream';
import { createTestMessageBody, insertMessageDraft, registerTestUser, testTrpc } from '@message-app/api/test';
import { db } from '@message-app/db';
import type { SerializedParagraphNode } from '@message-app/rich-text';
import { lifeCycle, s3Client2, uploadTempImage } from '@message-app/s3';
import { tmpPath } from '@message-app/s3/test/constants';
import { describe, expect, it } from 'vitest';

const testDir = path.dirname(require.resolve('@message-app/api/test'));
const testImageFile = Bun.file(path.resolve(testDir, './assets/image.jpg'));
const testVideoFile = Bun.file(path.resolve(testDir, './assets/video.mp4'));
const testInvalidFile = Bun.file(path.resolve(testDir, './assets/invalid.txt'));

// it.only('TEST', async () => {
//   const xy = await s3Client2.send(lifeCycle);
//   const x = await uploadCommand(testImageFile.stream());
//   console.log('🚀 ~ x: \n%o\n', xy);
//   expect(true).toBe(true);
// }, 60000);

// describe('getDraft', () => {
//   it('should get an existed message draft', async () => {
//     const { messageDraft, user } = await insertMessageDraft();

//     const result = await testTrpc({ user }).messages.getDraft({});

//     expect(result.id).toEqual(messageDraft.id);
//     expect(result).toHaveProperty('authorId', user.id);
//   });

//   it('should create a new draft if not exists', async () => {
//     const { user } = await registerTestUser();

//     const result = await testTrpc({ user }).messages.getDraft({});

//     expect(result).not.toBeNull();
//     expect(result).toHaveProperty('authorId', user.id);
//   });
// });

// describe('updateDraft', () => {
//   it('should update the message draft', async () => {
//     const { messageDraft, user } = await insertMessageDraft();

//     const result = await testTrpc({ user }).messages.updateDraft({
//       id: messageDraft.id,
//       body: createTestMessageBody('UPDATED'),
//     });

//     const updatedDraft = await db.query.messageDraftTable.findFirst({ where: { id: result.id } });
//     const text = (updatedDraft?.body.root.children[0] as SerializedParagraphNode)?.children[0];

//     expect(result.id).toEqual(messageDraft.id);
//     expect(text).toHaveProperty('text', 'UPDATED');
//   });
// });

describe('uploadImage', () => {
  it('should upload image', async () => {
    const { user } = await insertMessageDraft();

    const result = await testTrpc({ user }).messages.uploadImage(testImageFile.stream() as unknown as File);
    const fileExists = await fs.exists(path.resolve(tmpPath, result));
    expect(fileExists).toBeTruthy();
  });

  // it('should not upload invalid image', async () => {
  //   const { user } = await insertMessageDraft();

  //   const result = testTrpc({ user }).messages.uploadImage(testInvalidFile.stream() as unknown as File);

  //   await expect(result).rejects.toHaveProperty('code', 'BAD_REQUEST');
  // });
});

// describe('uploadVideo', () => {
//   it('should upload video', async () => {
//     const { user } = await insertMessageDraft();

//     const result = await testTrpc({ user }).messages.uploadVideo(testVideoFile.stream() as unknown as File);

//     const fileExists = await fs.exists(path.resolve(tmpPath, result));
//     expect(fileExists).toBeTruthy();
//   }, 60000);

//   it('should not upload invalid video', async () => {
//     const { user } = await insertMessageDraft();

//     const result = testTrpc({ user }).messages.uploadVideo(testInvalidFile.stream() as unknown as File);
//     await expect(result).rejects.toHaveProperty('code', 'BAD_REQUEST');
//   });
// });
