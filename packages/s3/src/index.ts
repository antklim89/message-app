import type { ReadStream } from 'node:fs';
import { type Duplex, PassThrough } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import {
  CreateBucketCommand,
  ListBucketsCommand,
  PutBucketLifecycleConfigurationCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { env } from '@message-app/env/server';

export const s3Client = new Bun.S3Client({
  region: 'ru-central-1',
  accessKeyId: env.S3_ACCESS_KEY_ID,
  secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  endpoint: env.S3_ENDPOINT,
});

// export const createBucketCommand = new CreateBucketCommand({
//   Bucket: 'test',
// });

export const uploadTempImage = async (key: string, imageStream: ReadableStream, transformStream?: Duplex) => {
  const passThrough = new PassThrough();
  const upload = new Upload({
    client: s3Client2,
    params: {
      Expires: new Date(Date.now() + 60 * 1000),
      Bucket: 'temp',
      Key: key,
      Body: passThrough,
    },
  });

  if (transformStream) await Promise.all([pipeline(imageStream, transformStream, passThrough), upload.done()]);
  else await Promise.all([pipeline(imageStream, passThrough), upload.done()]);

  return { upload, passThrough };
};

export const lifeCycle = new PutBucketLifecycleConfigurationCommand({
  Bucket: 'temp',
  LifecycleConfiguration: {
    Rules: [
      {
        ID: 'MoveLogsToGlacierAndExpire',
        Status: 'Enabled', // "Enabled" | "Disabled"
        Filter: {
          // Prefix: '', // Use {} to apply to the entire bucket
        },

        Expiration: {
          Days: 1,
        },
      },
    ],
  },
});

export const s3Client2 = new S3Client({
  region: 'ru-central-1',
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,

  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});
