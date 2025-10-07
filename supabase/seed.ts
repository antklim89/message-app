/** biome-ignore-all lint/performance/noAwaitInLoops: <rrr> */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: <ttt> */
import { faker } from '@faker-js/faker';
import type { SerializedLinkNode } from '@lexical/link';
import { createClient, type User } from '@supabase/supabase-js';
import type { SerializedParagraphNode, SerializedRootNode, SerializedTextNode } from 'lexical';

import type { Database, Json } from '../src/shared/model/supabase-types.generated';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
if (!(SUPABASE_URL && SUPABASE_SERVICE_ROLE)) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE are required.');
const sb = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

const PASSWORD = 'qwer1234';
const USERS_QTY = 0;
const MESSAGES_QTY = 1;
const MESSAGES_LOOP_QTY = 0;

function createLexicalText(): SerializedTextNode {
  return {
    type: 'text',
    version: 1,
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text: `${faker.lorem.sentence()} `,
  };
}

function createLexicalHashtag(): SerializedTextNode {
  return {
    type: 'hashtag',
    version: 1,
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text: `#${faker.lorem.word()}`,
  };
}

function createLexicalLink(): SerializedLinkNode {
  return {
    type: 'link',
    version: 1,
    format: 'start',
    direction: 'ltr',
    indent: 0,
    url: faker.internet.url(),
    children: [
      {
        type: 'text',
        version: 1,
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: faker.lorem.word(),
      } as SerializedTextNode,
    ],
  };
}

function createRandomLexicalNode() {
  const lexicalNodeCreators = [createLexicalText, createLexicalHashtag, createLexicalLink];
  return lexicalNodeCreators[faker.number.int({ min: 0, max: lexicalNodeCreators.length - 1 })]();
}

function createLexicalRoot(): SerializedRootNode {
  return {
    direction: 'ltr',
    format: 'start',
    indent: 0,
    type: 'root',
    version: 1,
    children: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () =>
        ({
          direction: 'ltr',
          format: 'start',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          type: 'paragraph',
          version: 1,
          children: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, createRandomLexicalNode),
        }) as SerializedParagraphNode,
    ),
  };
}

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
    const body = createLexicalRoot();

    await sb
      .from('messages')
      .insert({
        body: body as Json,
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
