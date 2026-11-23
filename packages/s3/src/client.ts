import { S3Client } from '@aws-sdk/client-s3';
import { env } from '@message-app/env/server';

export const s3Client = new S3Client({
  region: 'ru-central-1',
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,

  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});
