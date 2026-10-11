import { auth } from '@message-app/auth';
import type { Context as HonoContext } from 'hono';

export interface CreateContextOptions {
  context: HonoContext;
}

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  return {
    user: session?.user || null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
