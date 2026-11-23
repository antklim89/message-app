import { type Duplex, PassThrough } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { DeleteObjectCommand, HeadObjectCommand, S3ServiceException } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { env } from '@message-app/env/server';

import { s3Client } from './client';

export const uploadFileStream = async (key: string, readStream: ReadableStream, transformStream?: Duplex) => {
  const passThrough = new PassThrough();
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: env.S3_BUCKET,
      Key: key,
      Body: passThrough,
    },
  });

  if (transformStream) await Promise.all([pipeline(readStream, transformStream, passThrough), upload.done()]);
  else await Promise.all([pipeline(readStream, passThrough), upload.done()]);

  return { upload, passThrough };
};

export async function checkFileExists(key: string) {
  const command = new HeadObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  });

  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    if (error instanceof S3ServiceException && (error.name === 'NotFound' || error.$metadata.httpStatusCode === 404)) {
      return false;
    }
  }
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  });

  return s3Client.send(command);
}
