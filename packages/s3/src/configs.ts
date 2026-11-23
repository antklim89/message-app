import { PutBucketLifecycleConfigurationCommand } from '@aws-sdk/client-s3';
import { env } from '@message-app/env/server';

export const lifeCycle = new PutBucketLifecycleConfigurationCommand({
  Bucket: env.S3_BUCKET,
  LifecycleConfiguration: {
    Rules: [
      {
        ID: 'TempFiles',
        Status: 'Enabled',
        Filter: {
          Prefix: '/temp',
        },

        Expiration: {
          Days: 1,
        },
      },
    ],
  },
});
