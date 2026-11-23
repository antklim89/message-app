import { GenericContainer, Wait } from 'testcontainers';
import { s3Client } from '../src/client';
import { CreateBucketCommand } from '@aws-sdk/client-s3';

export default async function globalSetup() {
  const container = await new GenericContainer('rustfs/rustfs:1.0.4')
  .withAutoCleanup(true)
  .withExposedPorts(9000)
  .withEnvironment({
      RUSTFS_ROOT_USER: 'admin',
      RUSTFS_ROOT_PASSWORD: 'supersecretpassword',
      RUSTFS_ACCESS_KEY: 'access',
      RUSTFS_SECRET_KEY: 'secret',
  })
  .withWaitStrategy(Wait.forListeningPorts())
  .start()

  console.log(container.getHost())
  process.env.S3_ENDPOINT=`http://${container.getHost()}:${container.getMappedPort(9000)}`
  process.env.S3_ACCESS_KEY_ID='access'
  process.env.S3_SECRET_ACCESS_KEY='secret'
  // process.env.S3_BUCKET='temp'

  // const x = await s3Client.send(new CreateBucketCommand({Bucket: 'temp'}))
  // console.log('🚀 ~ x: \n%o\n', x)
}
