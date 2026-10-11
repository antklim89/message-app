import { trpcServer } from '@hono/trpc-server';
import { createContext } from '@message-app/api/context';
import { appRouter } from '@message-app/api/routers/index';
import { auth } from '@message-app/auth';
import { env } from '@message-app/env/server';
import { TRPCError } from '@trpc/server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';

const app = new Hono();

app
  .use(
    '*',
    cors({
      origin: env.WEB_URL,
      allowMethods: ['GET', 'POST', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  )
  .on(['POST', 'GET'], '/api/auth/*', c => auth.handler(c.req.raw))
  .use(
    '/trpc/*',
    trpcServer({
      router: appRouter,
      createContext: (_opts, context) => createContext({ context }),
    }),
  )
  .get('/', c => {
    return c.json({ message: 'ok' }, 200);
  })
  .notFound(c => {
    const trpcError = new TRPCError({
      code: 'NOT_FOUND',
      message: 'Route not Found.',
    });
    return c.json(trpcError, 404);
  })
  .onError((error, c) => {
    if (error instanceof HTTPException) {
      const trpcError = new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      });
      return c.json(trpcError, error.status);
    }

    const trpcError = new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unexpected error. Try again later.',
    });
    console.error('Unexpected Error:\n', error);
    return c.json(trpcError, 500);
  });

export default {
  port: process.env.PORT || 8000,
  fetch: app.fetch,
};
