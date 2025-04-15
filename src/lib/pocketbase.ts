import { use } from 'react';
import type { ClientResponseError } from 'pocketbase';

import type { TypedPocketBase } from '@/pocketbase-types.gen';
import { env } from './env';

const pbPromise = import('pocketbase');

export function usePocketBase() {
  const { default: PocketBase } = use(pbPromise);
  const pb = new PocketBase(env.SERVER_URL) as TypedPocketBase;
  return pb;
}

export async function createPocketbaseClient() {
  const { default: PocketBase } = await pbPromise;
  const pb = new PocketBase(env.SERVER_URL) as TypedPocketBase;
  return pb;
}

export function flattenPocketbaseErrors(error: ClientResponseError) {
  return Object.entries(error.response.data).reduce((acc: Record<string, string>, [key, value]) => {
    acc[key] = (value as { message: string }).message;
    return acc;
  }, {});
}
