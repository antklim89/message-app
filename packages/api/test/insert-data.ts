import { auth, type User } from '@message-app/auth';
import { db, messageDraftTable, messageTable } from '@message-app/db';

import { createTestMessageData, createTestUserData } from './test-data';

export async function registerTestUser(user: Partial<User> = {}) {
  const ctx = await auth.$context;
  const userSaved = await ctx.test.saveUser({ ...createTestUserData(), ...user });
  const loginResult = await ctx.test.login({ userId: userSaved.id });

  return loginResult;
}

export async function insertMessage({
  message = {},
  user,
}: {
  message?: Partial<Omit<typeof messageTable.$inferInsert, 'userId' | 'breedName'>>;
  user?: User;
} = {}) {
  const registeredUser = user ? user : (await registerTestUser()).user;

  const [messageInserted] = await db
    .insert(messageTable)
    .values(createTestMessageData({ message, userId: registeredUser.id }))
    .returning();

  return {
    message: messageInserted!,
    user: registeredUser,
  };
}

export async function insertMessageDraft({
  message = {},
  user,
}: {
  message?: Partial<Omit<typeof messageDraftTable.$inferInsert, 'userId' | 'breedName'>>;
  user?: User;
} = {}) {
  const registeredUser = user ? user : (await registerTestUser()).user;

  const [messageDraftInserted] = await db
    .insert(messageDraftTable)
    .values(createTestMessageData({ message, userId: registeredUser.id }))
    .returning();

  return {
    messageDraft: messageDraftInserted!,
    user: registeredUser,
  };
}
