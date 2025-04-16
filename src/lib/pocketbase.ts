import { use } from 'react';
import type { ClientResponseError } from 'pocketbase';

import type { TypedPocketBase } from '@/pocketbase-types.gen';
import { env } from './env';

const pbPromise = import('pocketbase');

let pb: TypedPocketBase | undefined;

export function usePocketBase() {
  if (pb != null) return pb;
  const { default: PocketBase } = use(pbPromise);
  pb = new PocketBase(env.SERVER_URL) as TypedPocketBase;
  return pb;
}

export async function createPocketbaseClient() {
  if (pb != null) return pb;
  const { default: PocketBase } = await pbPromise;
  pb = new PocketBase(env.SERVER_URL) as TypedPocketBase;
  return pb;
}

export function flattenPocketbaseErrors(error: ClientResponseError) {
  return Object.entries(error.response.data).reduce((acc: Record<string, string>, [key, value]) => {
    acc[key] = (value as { message: string }).message;
    return acc;
  }, {});
}
