import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { createTestMessageBody, insertMessageDraft, registerTestUser, testTrpc } from '@message-app/api/test';
import { db } from '@message-app/db';
import type { SerializedParagraphNode } from '@message-app/rich-text';
import { checkFileExists } from '@message-app/s3';
import { describe, expect, it } from 'vitest';

const testDir = path.dirname(require.resolve('@message-app/api/test'));
const testImageFile = Bun.file(path.resolve(testDir, './assets/image.jpg'));
const testVideoFile = Bun.file(path.resolve(testDir, './assets/video.mp4'));
const testInvalidFile = Bun.file(path.resolve(testDir, './assets/invalid.txt'));

describe('getDraft', () => {
  it('should get an existed message draft', async () => {
    const { messageDraft, user } = await insertMessageDraft();

    const result = await testTrpc({ user }).messages.getDraft({});

    expect(result.id).toEqual(messageDraft.id);
    expect(result).toHaveProperty('authorId', user.id);
  });

  it('should create a new draft if not exists', async () => {
    const { user } = await registerTestUser();

    const result = await testTrpc({ user }).messages.getDraft({});

    expect(result).not.toBeNull();
    expect(result).toHaveProperty('authorId', user.id);
  });
});

describe('updateDraft', () => {
  it('should update the message draft', async () => {
    const { messageDraft, user } = await insertMessageDraft();

    const result = await testTrpc({ user }).messages.updateDraft({
      id: messageDraft.id,
      body: createTestMessageBody('UPDATED'),
    });

    const updatedDraft = await db.query.messageDraftTable.findFirst({ where: { id: result.id } });
    const text = (updatedDraft?.body.root.children[0] as SerializedParagraphNode)?.children[0];

    expect(result.id).toEqual(messageDraft.id);
    expect(text).toHaveProperty('text', 'UPDATED');
  });
});

describe('uploadTempFile', () => {
  it('should upload video', async () => {
    const { user } = await insertMessageDraft();

    const result = await testTrpc({ user }).messages.uploadTempFile(testVideoFile.stream() as unknown as File);

    const isFileExists = await checkFileExists(result);
    expect(isFileExists).toBeTruthy();
  }, 60000);

  it('should not upload invalid video', async () => {
    const { user } = await insertMessageDraft();

    const result = testTrpc({ user }).messages.uploadTempFile(testInvalidFile.stream() as unknown as File);
    await expect(result).rejects.toHaveProperty('code', 'INTERNAL_SERVER_ERROR');
  });
});
