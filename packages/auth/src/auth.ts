import { db, schema } from '@message-app/db';
import { env } from '@message-app/env/server';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { testUtils } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',

    schema: {
      account: schema.accountTable,
      session: schema.sessionTable,
      user: schema.userTable,
      verification: schema.verificationTable,
    },
  }),
  trustedOrigins: [env.WEB_URL],
  emailAndPassword: {
    enabled: true,
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.WEB_URL,
  advanced: {
    database: {
      generateId: 'uuid',
    },
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [testUtils()],
  user: {
    additionalFields: {
      displayname: { type: 'string', input: false, required: false, returned: false },
      bio: { type: 'string', input: false, required: false, returned: false },
    },
  },
});
