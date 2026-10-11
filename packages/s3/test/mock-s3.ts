import { mkdirSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { beforeAll, vi } from 'vitest';

import { tmpPath } from './constants';

beforeAll(async () => {
  await rm(tmpPath, { force: true, recursive: true });
});

vi.mock('@message-app/s3', () => {
  return {
    s3Client: {
      file: vi.fn(path => {
        const fileTmpPath = join(tmpPath, path);
        mkdirSync(dirname(fileTmpPath), { recursive: true });
        const file = Bun.file(fileTmpPath);
        return file;
      }),
    },
  };
});
