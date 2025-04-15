import PocketBase, { type ClientResponseError } from 'pocketbase';

import type { TypedPocketBase } from '@/pocketbase-types.gen';
import { env } from './env';

export const pb = new PocketBase(env.SERVER_URL) as TypedPocketBase;

export function flattenPocketbaseErrors(error: ClientResponseError) {
  return Object.entries(error.response.data).reduce((acc: Record<string, string>, [key, value]) => {
    acc[key] = (value as { message: string }).message;
    return acc;
  }, {});
}
