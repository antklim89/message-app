/** biome-ignore-all lint/performance/noAwaitInLoops: <rrr> */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: <ttt> */
import { faker } from '@faker-js/faker';
import { createClient, type User } from '@supabase/supabase-js';

import type { Database } from '../src/shared/model/supabase-types.generated';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
if (!(SUPABASE_URL && SUPABASE_SERVICE_ROLE)) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE are required.');
const sb = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

const PASSWORD = 'qwer1234';
const USERS_QTY = 0;
const MESSAGES_QTY = 0;
const MESSAGES_LOOP_QTY = 0;

/** USERS */
async function getUsers() {
  for (let index = 0; index < USERS_QTY; index++) {
    const name = faker.internet.username();

    await sb.auth.admin.createUser({
      email: faker.internet.email({ firstName: name }),
      password: PASSWORD,
      user_metadata: { username: name },
      email_confirm: true,
    });
  }

  const usersList = await sb.auth.admin.listUsers().then(d => d.data.users);
  for (const user of usersList) {
    await sb
      .from('profiles')
      .update({ bio: faker.lorem.sentence({ min: 20, max: 200 }) })
      .eq('id', user.id);
  }

  const hasAdmin = usersList.some(user => user.email === 'admin@mail.com');
  if (!hasAdmin) {
    await sb.auth.admin.createUser({
      email: 'admin@mail.com',
      password: PASSWORD,
      user_metadata: { username: 'Admin' },
      email_confirm: true,
    });
  }

  return usersList;
}

/** MESSAGES */
async function getMessages(users: User[], answers?: { id: number }[]) {
  for (let index = 0; index < MESSAGES_QTY; index++) {
    const updated = faker.date.recent({ days: 9000 }).toISOString();
    await sb
      .from('messages')
      .insert({
        body: faker.lorem.sentence({ min: 3, max: 50 }),
        authorId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        updated,
        created: faker.date.recent({ days: 600, refDate: updated }).toISOString(),
        answerId: answers?.[faker.number.int({ min: 0, max: answers.length - 1 })]?.id,
      })
      .select('id')
      .single()
      .throwOnError();
  }

  const result = await sb.from('messages').select('id').throwOnError();
  return result.data;
}

/** LIKES */
async function getLikes(users: User[], messages: { id: number }[]) {
  const { data: likes } = await sb.from('likes').select('*', { count: 'exact' });

  for (const user of users) {
    for (const message of messages) {
      const hasLike = likes?.some(i => i.authorId === user.id && i.messageId === message.id) ?? false;
      if (hasLike) {
        if (faker.number.int({ min: 0, max: 1 }) === 0) continue;
        await sb.from('likes').delete().eq('authorId', user.id).eq('messageId', message.id);
      } else {
        if (faker.number.int({ min: 0, max: 1 }) === 0) continue;
        await sb.from('likes').insert({ authorId: user.id, messageId: message.id });
      }
    }
  }
}

/** FAVORITES */
async function getFavorites(users: User[], messages: { id: number }[]) {
  const { data: favorites } = await sb.from('favorites').select('*', { count: 'exact' });

  for (const user of users) {
    for (const message of messages) {
      const hasLike = favorites?.some(i => i.authorId === user.id && i.messageId === message.id) ?? false;
      if (hasLike) {
        if (faker.number.int({ min: 0, max: 1 }) === 0) continue;
        await sb.from('favorites').delete().eq('authorId', user.id).eq('messageId', message.id);
      } else {
        if (faker.number.int({ min: 0, max: 1 }) === 0) continue;
        await sb.from('favorites').insert({ authorId: user.id, messageId: message.id });
      }
    }
  }
}

const usersList = await getUsers();
let messagesList = await getMessages(usersList);
for (let index = 0; index < MESSAGES_LOOP_QTY; index++) {
  messagesList = await getMessages(usersList, messagesList);
}

await getLikes(usersList, messagesList);
await getFavorites(usersList, messagesList);
