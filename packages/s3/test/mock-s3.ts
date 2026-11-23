import { randomUUID } from 'node:crypto';
import { CreateBucketCommand } from '@aws-sdk/client-s3';
import { env } from '@message-app/env/server';
import { beforeEach } from 'vitest';

import { s3Client } from '../src/client';

beforeEach(async () => {
  const bucket = randomUUID();
  await s3Client.send(new CreateBucketCommand({ Bucket: bucket })).catch(() => null);
  process.env.S3_BUCKET = bucket;
  // @ts-expect-error testing
  env.S3_BUCKET = bucket;
});
