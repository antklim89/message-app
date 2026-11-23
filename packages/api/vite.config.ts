/// <reference types="vitest/config" />

import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

process.loadEnvFile(resolve('apps/server/.env'));

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },

  test: {
    setupFiles: [
      createRequire(import.meta.url).resolve('@message-app/db/test/init-db'),
      createRequire(import.meta.url).resolve('@message-app/s3/test/mock-s3'),
    ],
    globalSetup: [createRequire(import.meta.url).resolve('@message-app/s3/test/global-setup')],
  },
});
